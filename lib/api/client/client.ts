'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import { Client, HttpClientConfig } from '@/lib/api/HttpClient';
import FetchError from '@/lib/api/HttpClient/FetchError';
import { cookies, headers } from 'next/headers';

/* eslint-disable consistent-return */

export const updateAccessToken = async (
  refreshToken: string,
  baseUrl?: string
) => {
  const headersList = headers();
  const tempOrigin = `${headersList.get('x-forwarded-proto')}://${headersList.get('x-forwarded-host')}`;

  const url = baseUrl ?? `${tempOrigin}${process.env.NEXT_PUBLIC_PROXY_URL}`;

  try {
    const response = await fetch(`${url}${ENDPOINTS.AUTH.POST_REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.accessToken;
  } catch (error: any) {
    console.error('Failed to refresh token:', error.message);
  }
};

// const BASE_URL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_PUBLIC_APP_BASE_URL || ''
//     : 'http://localhost:3000';

const clientInstance = new Client({
  // baseURL: BASE_URL + process.env.NEXT_PUBLIC_PROXY_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: true,
});

// 쿠키를 이용한 요청 설정 로직 (baseURL 유동적으로 설정, 인증헤더 설정)
clientInstance.interceptors.request.use(async (config) => {
  const requestConfig = config;
  const cookieStore = cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  const headersList = headers();
  const tempOrigin = `${headersList.get('x-forwarded-proto')}://${headersList.get('x-forwarded-host')}`;

  requestConfig.baseURL = tempOrigin + process.env.NEXT_PUBLIC_PROXY_URL;

  requestConfig.headers.Cookie = decodedCookie || '';

  // requestConfig.headers['Access-Control-Allow-Origin'] = tempOrigin;

  const accessToken = cookieStore.get('accessToken')?.value || null;
  const refreshToken = cookieStore.get('refreshToken')?.value || null;

  if (accessToken) {
    requestConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (!accessToken && refreshToken) {
    const refreshedToken = await updateAccessToken(refreshToken);
    requestConfig.headers.Authorization = `Bearer ${refreshedToken ?? null}`;
  }

  return requestConfig;
});

interface ClientError {
  info?: string;
  body?: string;
  message?: string;
  hasBodyMessage?: boolean;
  status?: number;
  statusText?: string;
  [key: string]: unknown;
}

export type ClientResponse<T> =
  | { data: T; error: null }
  | { data: null; error: FetchError | ClientError };

const client = async <T = unknown>(
  url: string,
  config: HttpClientConfig
): Promise<ClientResponse<T>> => {
  try {
    const response: T = await clientInstance.request(url, config);
    return { data: response, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error as FetchError,
    };
  }
};

export default client;
