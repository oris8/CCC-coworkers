import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const DEFAULT_TOKEN_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  maxAge: 60 * 60, // 1 hour
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

export default DEFAULT_TOKEN_OPTIONS;
