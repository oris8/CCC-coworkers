import { DEFAULT_TOKEN_OPTIONS } from '@/lib/api/API_CONSTANTS';
import applySetCookie from '@/lib/middlewares/utils';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable consistent-return */

export default async function processTokenFromQuery(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pattern = url.pathname.startsWith('/reset-password');
  if (!pattern) return;

  const token = url.searchParams.get('token');

  // 만약 token이 쿼리에 있다면
  if (token) {
    url.searchParams.delete('token');
    const redirectResponse = NextResponse.redirect(url);
    // URL에서 token 파라미터를 제거.

    redirectResponse.cookies.set('sessionToken', token, {
      ...DEFAULT_TOKEN_OPTIONS,
      maxAge: undefined, // 세션 쿠키로 지정
    });
    applySetCookie(request, redirectResponse);

    // 수정된 URL로 리다이렉트.
    return redirectResponse;
  }
}
