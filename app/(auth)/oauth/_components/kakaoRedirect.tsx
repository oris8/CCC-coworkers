'use client';

import { loginWithOAuth } from '@/lib/api/auth';
import { SignInWithOAuthRequestBody } from '@ccc-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function KakaoRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const Loading = dynamic(() => import('@/components/common/loading'), {
    ssr: false,
  });

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      try {
        // url 정보 가져오기
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        if (!code || !state) {
          toast.error('Required parameters are missing');
          setIsLoading(false);
          return;
        }

        const data: SignInWithOAuthRequestBody = {
          state,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
        };

        const res = await loginWithOAuth('KAKAO', data);
        if (res) {
          router.push('/');
        }
      } catch (error) {
        toast.error('Error during Kakao OAuth');
        setIsLoading(false);
      }
    };

    handleKakaoRedirect();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return null;
}
