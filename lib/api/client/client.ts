'use server';

import { Client, HttpClientConfig } from '@/lib/api/HttpClient';
import FetchError from '@/lib/api/HttpClient/FetchError';
import { cookies } from 'next/headers';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_APP_BASE_URL || ''
    : 'http://localhost:3000';

const clientInstance = new Client({
  baseURL: BASE_URL + process.env.NEXT_PUBLIC_PROXY_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: true,
});

clientInstance.interceptors.request.use((config) => {
  const requestConfig = config;
  const cookieStore = cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  requestConfig.headers.Cookie = decodedCookie || '';

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
