'use client';

import { loginWithOAuth } from '@/lib/api/auth';
import { SignInWithOAuthRequestBody } from '@ccc-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      if (typeof window === 'undefined') return;

      // kakao 인가 code 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!code || !state) {
        throw new Error('Required parameters are missing');
      }

      // 발급받은 인가 코드로 토큰 발급
      if (code) {
        const data: SignInWithOAuthRequestBody = {
          state,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
        };
        const res = await loginWithOAuth('KAKAO', data);
        if (res) {
          setIsLoading(false);
          router.push('/');
        }
      }
    };

    handleKakaoRedirect();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}
