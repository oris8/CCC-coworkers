'use server';

import { Client, HttpClientConfig } from '@/lib/api/HttpClient';
import Error from 'next/error';
import { cookies } from 'next/headers';

/* eslint-disable no-underscore-dangle, @typescript-eslint/return-await */

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_APP_BASE_URL || ''
    : 'http://localhost:3000';

const serverClient = new Client({
  baseURL: BASE_URL + process.env.NEXT_PUBLIC_PROXY_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: true,
});

serverClient.interceptors.request.use((config) => {
  const requestConfig = config;
  const cookieStore = cookies();
  const decodedCookie = decodeURIComponent(cookieStore.toString());

  requestConfig.headers.Cookie = decodedCookie || '';

  return requestConfig;
});

const client = async <T = unknown>(url: string, options: HttpClientConfig) => {
  try {
    const response: T = await serverClient.request(url, options);
    return { data: response };
  } catch (error) {
    return { error: error as Error };
  }
};

export default client;
