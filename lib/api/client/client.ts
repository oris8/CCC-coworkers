'use server';

import { Client, HttpClientConfig } from '@/lib/api/HttpClient';
import FetchError from '@/lib/api/HttpClient/FetchError';
import { cookies, headers } from 'next/headers';

/* eslint-disable prefer-template */

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

clientInstance.interceptors.request.use((config) => {
  const requestConfig = config;
  const cookieStore = cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  const headersList = headers();

  const tempOrigin =
    headersList.get('x-forwarded-proto') +
    '://' +
    headersList.get('x-forwarded-host');
  requestConfig.baseURL = tempOrigin + process.env.NEXT_PUBLIC_PROXY_URL;

  requestConfig.headers.Cookie = decodedCookie || '';

  requestConfig.headers['Access-Control-Allow-Origin'] = tempOrigin;

  const accessToken = cookieStore.get('accessToken')?.value || null;
  if (accessToken)
    requestConfig.headers.Authorization = `Bearer ${accessToken}`;

  return requestConfig;
});

const client = async <T = unknown>(url: string, options: HttpClientConfig) => {
  try {
    const response: T = await clientInstance.request(url, options);
    return { data: response };
  } catch (error: any) {
    return {
      error: error as FetchError,
    };
  }
};

export default client;
