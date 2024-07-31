'use server';

import { DEFAULT_TOKEN_OPTIONS, ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import {
  Id,
  OAuthProvider,
  OAuthToken,
  Password,
  UrlType,
  User,
} from '@ccc-types';
import { jwtDecode } from 'jwt-decode';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type PasswordAuthentication = {
  passwordConfirmation: Password;
  password: Password;
};

type SignUpRequestBody = Pick<User, 'image' | 'nickname' | 'email'> &
  PasswordAuthentication;

type SignInRequestBody = Pick<SignUpRequestBody, 'email' | 'password'>;
interface SignInWithOAuthRequestBody {
  state: string; // code를 얻을 때 사용하였던 state 값
  redirectUri: UrlType; // example: http://localhost:3000/OAuth/kakao
  token: OAuthToken;
}
interface AuthResponse {
  refreshToken: string;
  accessToken: string;
  user: User;
}

function setTokenAndRedirection(accessToken: string, refreshToken: string) {
  cookies().set('accessToken', accessToken, DEFAULT_TOKEN_OPTIONS);
  cookies().set('refreshToken', refreshToken, {
    ...DEFAULT_TOKEN_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(data: SignUpRequestBody): Promise<void> {
  const { data: response, error } = await client<AuthResponse>(
    ENDPOINTS.AUTH.POST_SIGNUP,
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    throw new Error('회원가입에 실패했습니다', { cause: error });
  }
  setTokenAndRedirection(response.accessToken, response.refreshToken);
}

export async function login(data: SignInRequestBody): Promise<void> {
  const { data: response, error } = await client<AuthResponse>(
    ENDPOINTS.AUTH.POST_SIGNIN,
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    throw new Error('로그인에 실패했습니다', { cause: error });
  }
  setTokenAndRedirection(response.accessToken, response.refreshToken);
}

// 가입되어있지 않을 경우엔 가입됩니다.
export async function loginWithOAuth(
  provider: OAuthProvider,
  data: SignInWithOAuthRequestBody
): Promise<void> {
  const { data: response, error } = await client<AuthResponse>(
    ENDPOINTS.AUTH.POST_SIGNIN_PROVIDER(provider),
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    throw new Error('간편로그인에 실패했습니다', { cause: error });
  }
  setTokenAndRedirection(response.accessToken, response.refreshToken);
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

export async function updateAccessToken(refreshToken: string) {
  const { data, error } = await client<{ accessToken: string }>(
    ENDPOINTS.AUTH.POST_REFRESH_TOKEN,
    {
      method: 'post',
      data: { refreshToken },
    }
  );
  if (error) {
    throw new Error('토큰 갱신에 실패했습니다', { cause: error });
  }
  const newAccessToken = data.accessToken;
  return newAccessToken;
}
