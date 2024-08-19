'use client';

import { loginWithOAuth } from '@/lib/api/auth';
import { generateRandomState } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function GoogleRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const Loading = dynamic(() => import('@/components/common/loading'), {
    ssr: false,
  });

  // google token 가져오기
  const getGoogleToken = async (code: string): Promise<string> => {
    const url = 'https://oauth2.googleapis.com/token';

    const bodyData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY || '',
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
      code,
    });

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: bodyData,
      });

      const data = await res.json();
      return data.id_token;
    } catch (e) {
      toast.error('Error in getgoogleToken');
      throw e;
    }
  };

  useEffect(() => {
    // 서버에 유저 정보 보내기
    const handleGoogleRedirect = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        if (!code) {
          toast.error('No code found in URL');
          setIsLoading(false);
          return;
        }

        const state = generateRandomState();
        const token = await getGoogleToken(code);
        const data = {
          state,
          token,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
        };
        const res = await loginWithOAuth('GOOGLE', data);
        if (res) {
          router.push('/');
        }
      } catch (error) {
        toast.error('Error during Google OAuth');
        setIsLoading(false);
      }
    };

    handleGoogleRedirect();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return null;
}
