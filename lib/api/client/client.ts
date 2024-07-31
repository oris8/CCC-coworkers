import { Client, HttpClientConfig } from '@/lib/api/HttpClient';

const clientInstance = new Client({
  baseURL: process.env.NEXT_PUBLIC_PROXY_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: true,
});

const client = async <T = unknown>(url: string, options: HttpClientConfig) => {
  try {
    const response: T = await clientInstance.request(url, options);
    return { data: response };
  } catch (error) {
    return { error: error as Error };
  }
};

export default client;
