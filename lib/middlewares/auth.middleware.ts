import { checkAccessToken } from '@/lib/api/auth';
import applySetCookie from '@/lib/middlewares/utils';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable consistent-return */

export default async function validateTokenAndSetAuthHeader(
  request: NextRequest
) {
  const url = new URL(request.url);
  const proxyPattern =
    process.env.NEXT_PUBLIC_PROXY_URL &&
    url.pathname.startsWith(process.env.NEXT_PUBLIC_PROXY_URL);
  if (!proxyPattern) return;

  const accessToken = request.cookies.get('accessToken')?.value || null;
  const refreshToken = request.cookies.get('refreshToken')?.value || null;

  const isValid = accessToken ? await checkAccessToken(accessToken) : false;

  if (!isValid && refreshToken) {
    // TODO 리프레시토큰으로 엑세스토큰 재설정로직 (수정 예정)
    // const redirectResponse = NextResponse.redirect(request.url);
    // const newAccessToken = await updateAccessToken(refreshToken);
    // redirectResponse.cookies.set(
    //   'accessToken',
    //   newAccessToken,
    //   DEFAULT_TOKEN_OPTIONS
    // );
    // applySetCookie(request, redirectResponse);
    // return redirectResponse;
  }

  const nextResponse = NextResponse.next();

  // if (nextResponse.headers.get('Authorization')) return nextResponse;

  try {
    nextResponse.headers.set('Authorization', `Bearer ${accessToken}`);
    applySetCookie(request, nextResponse);
    return nextResponse;
  } catch (error) {
    console.error('토큰 갱신 처리 중 오류 발생:', error);
    // TODO:
    // url.pathname = '/';
    // return NextResponse.redirect(url);
    // }
  }
}
