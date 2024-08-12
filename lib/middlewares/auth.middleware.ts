import DEFAULT_TOKEN_OPTIONS from '@/lib/api/DEFAULT_TOKEN_OPTIONS';
import { checkAccessToken, updateAccessToken } from '@/lib/api/auth';
import applySetCookie from '@/lib/middlewares/utils';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable consistent-return */

// 유저만 접근 가능한 페이지
// 필요할 때 추가해서 사용하시면 됩니다
const WITH_AUTH_PATH = ['/my-account'];

// 엔드포인트를 기준으로 인증된 유저인지 확인합니다
// accessToken이 만료됐지만 refreshToken이 있으면 갱신로직을 진행합니다
// (참고) 현재 토큰 갱신로직은 이 파일에만 존재합니다
export default async function withAuth(request: NextRequest) {
  const url = new URL(request.url);
  const isMatched = WITH_AUTH_PATH.includes(url.pathname);
  if (!isMatched) return;

  const accessToken = request.cookies.get('accessToken')?.value || null;
  const refreshToken = request.cookies.get('refreshToken')?.value || null;

  const isValid = accessToken ? await checkAccessToken(accessToken) : false;

  if (!isValid && refreshToken) {
    const redirectResponse = NextResponse.redirect(url);
    const { data: newAccessToken, error } =
      await updateAccessToken(refreshToken);
    if (error) return console.error(error?.message || error.info);
    redirectResponse.cookies.set(
      'accessToken',
      newAccessToken,
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
