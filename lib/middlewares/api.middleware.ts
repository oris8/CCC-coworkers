import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable consistent-return */

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://ccc-coworkers.vercel.app',
//   'https:/ccc-coworkers-preview*',
// ];

// proxy 서버를 거치는 요청의 경우,
// 요청헤더의 Cookie를 통해 header에 인증 토큰을 넣어주는 함수
export default async function setAuthHeader(request: NextRequest) {
  const url = new URL(request.url);
  const proxyPattern =
    process.env.NEXT_PUBLIC_PROXY_URL &&
    url.pathname.startsWith(process.env.NEXT_PUBLIC_PROXY_URL);
  if (!proxyPattern) return;

  const nextResponse = NextResponse.next();

  const tempOrigin = request.nextUrl.origin;
  nextResponse.headers.append('Access-Control-Allow-Origin', tempOrigin);

  const accessToken = request.cookies.get('accessToken')?.value || null;
  if (accessToken)
    nextResponse.headers.set('Authorization', `Bearer ${accessToken}`);

  return nextResponse;
}
