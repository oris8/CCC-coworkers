'use server';

import DEFAULT_TOKEN_OPTIONS from '@/lib/api/DEFAULT_TOKEN_OPTIONS';
import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import {
  AuthResponse,
  Id,
  OAuthProvider,
  SignInRequestBody,
  SignInWithOAuthRequestBody,
  SignUpRequestBody,
} from '@ccc-types';
import { jwtDecode } from 'jwt-decode';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/* eslint-disable consistent-return */

function setTokenAndRedirection(accessToken: string, refreshToken: string) {
  cookies().set('accessToken', accessToken, DEFAULT_TOKEN_OPTIONS);
  cookies().set('refreshToken', refreshToken, {
    ...DEFAULT_TOKEN_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(data: SignUpRequestBody) {
  const res = await client<AuthResponse>(ENDPOINTS.AUTH.POST_SIGNUP, {
    method: 'post',
    data,
  });

  if (res.data) {
    setTokenAndRedirection(res.data.accessToken, res.data.refreshToken);
  }

  return handleApiResponse(res, '회원가입에 실패했습니다.');
}

export async function login(
  data: SignInRequestBody,
  options: { redirect?: boolean } = { redirect: true }
) {
  const res = await client<AuthResponse>(ENDPOINTS.AUTH.POST_SIGNIN, {
    method: 'post',
    data,
  });

  if (res.data && options.redirect) {
    const { accessToken, refreshToken } = res.data;
    setTokenAndRedirection(accessToken, refreshToken);
  }

  return handleApiResponse(res, '로그인에 실패했습니다.');
}

// 가입되어있지 않을 경우엔 가입됩니다.
export async function loginWithOAuth(
  provider: OAuthProvider,
  data: SignInWithOAuthRequestBody
) {
  const res = await client<AuthResponse>(
    ENDPOINTS.AUTH.POST_SIGNIN_PROVIDER(provider),
    {
      method: 'post',
      data,
    }
  );

  if (res.data) {
    const { accessToken, refreshToken } = res.data;
    setTokenAndRedirection(accessToken, refreshToken);
  }

  return handleApiResponse(res, '간편로그인에 실패했습니다.');
}

export async function logout() {
  cookies().set('accessToken', '', { maxAge: -1, path: '/' });
  cookies().set('refreshToken', '', { maxAge: -1, path: '/' });
  redirect('/');
}

/*
------------------ 토큰 관련  ------------------  
*/

type UserJWTDecode = {
  exp: string;
  iat: string;
  id: Id;
  iss: string;
  scope: string;
  teamId: string;
};

export async function checkAccessToken(accessToken: string) {
  try {
    const decodedToken: UserJWTDecode = jwtDecode(accessToken);
    const isValid = decodedToken.iss === 'sp-coworkers';
    const isExpired = Number(decodedToken.exp) * 1000 < new Date().getTime();
    return !isExpired && isValid;
  } catch (error) {
    console.error('액세스 토큰 검사 중 오류 발생:', error);
    return false;
  }
}
