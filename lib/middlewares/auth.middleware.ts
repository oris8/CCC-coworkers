import DEFAULT_TOKEN_OPTIONS from '@/lib/api/DEFAULT_TOKEN_OPTIONS';
import { checkAccessToken } from '@/lib/api/auth';
import { updateAccessToken } from '@/lib/api/client/client';
import { NextRequest, NextResponse } from 'next/server';

import applySetCookie from './utils';

/* eslint-disable consistent-return */

// 유저만 접근 가능한 페이지 (필요할 때 추가해서 사용하시면 됩니다)
const WITH_AUTH_PATH = [
  '/my-account',
  '/addboard',
  '/user-history',
  '/create-team',
  '/boards',
  '/board',
  '/invitation-team',
];
// 유저만 접근 가능한 상세 게시판 및 할 일 페이지 관련 정규식
const WITH_AUTH_REGEX = [/^\/\d+($|\/.*$)/, /^\/board(\/.*)?$/];

/**
 * 인증이 필요한 페이지를 보호하기 위한 미들웨어.
 *
 * 이 미들웨어는 요청된 페이지가 보호된 페이지 목록(`WITH_AUTH_PATH`)에 있는지 확인합니다.
 * 사용자가 유효한 `accessToken`으로 인증된 경우 요청이 계속 진행됩니다.
 * 만약 `accessToken`이 만료되었지만 `refreshToken`이 유효한 경우, 토큰을 갱신하고 이를 쿠키에 저장합니다.
 *
 * - `@/api/client/client.ts`: 토큰을 갱신하고 새로운 토큰으로 API 요청을 수행합니다(새로운 토큰을 쿠키에 저장하지 않음).
 * - `middleware`: 보호된 페이지로 이동할 때 토큰이 만료된 경우 토큰을 갱신하고, 새 토큰을 쿠키에 저장합니다.
 *
 * @param {NextRequest} request - Next.js에서 전달된 요청 객체.
 * @returns {Promise<NextResponse | undefined>} - 요청을 계속 진행하거나 로그인 페이지로 리다이렉트하거나, 토큰을 갱신하는 Next.js 응답 객체.
 */
export default async function withAuth(request: NextRequest) {
  const url = new URL(request.url);
  const isMatched =
    WITH_AUTH_PATH.includes(url.pathname) ||
    WITH_AUTH_REGEX.some((regex) => regex.test(url.pathname));
  if (!isMatched) return;

  const accessToken = request.cookies.get('accessToken')?.value || null;
  const refreshToken = request.cookies.get('refreshToken')?.value || null;

  const isValid = accessToken ? await checkAccessToken(accessToken) : false;

  if (!isValid && refreshToken) {
    const redirectResponse = NextResponse.redirect(url);
    const refreshedToken = await updateAccessToken(refreshToken);
    redirectResponse.cookies.set(
      'accessToken',
      refreshedToken,
      DEFAULT_TOKEN_OPTIONS
    );
    applySetCookie(request, redirectResponse);
    return redirectResponse;
  }

  if (!isValid) {
    const redirectResponse = NextResponse.redirect(new URL('/login', url));
    return redirectResponse;
  }

  const nextResponse = NextResponse.next();
  return nextResponse;
}
