import { processTokenFromQuery, withAuth } from '@/lib/middlewares';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const withAuthResponse = await withAuth(request);
  if (withAuthResponse) return withAuthResponse;

  const resetPasswordResponse = await processTokenFromQuery(request);
  if (resetPasswordResponse) return resetPasswordResponse;
}

export const config = {
  matcher: [
    /*
     * 다음과 같이 시작하는 경로를 제외한 모든 요청 경로와 일치:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘s 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
