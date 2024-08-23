'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import { Email, Nickname, Password, UrlType } from '@ccc-types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { logout } from './auth';

export async function updateUser(user: {
  nickname?: Nickname;
  image?: UrlType;
}) {
  const res = await client<{ message: string }>(ENDPOINTS.USER.ACTIONS, {
    method: 'patch',
    data: user,
  });

  if (!res?.error) {
    revalidatePath('/', 'layout');
    redirect('/my-account');
  }

  return handleApiResponse(
    res,
    '유저 정보를 업데이트 하는 중 에러가 발생했습니다.'
  );
}

export async function deleteUser() {
  const res = await client<void>(ENDPOINTS.USER.ACTIONS, {
    method: 'delete',
  });

  if (!res?.error) {
    await logout();
  }

  return handleApiResponse(
    res,
    '유저 정보를 업데이트 하는 중 에러가 발생했습니다.'
  );
}

type PasswordAuthentication = {
  passwordConfirmation: Password;
  password: Password;
};

type SendResetPasswordEmailRequestBody = {
  // 비밀번호 재설정 이메일 전송
  // {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다.
  // e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
  email: Email;
  redirectUrl: UrlType;
};

type PatchPasswordRequestBody = PasswordAuthentication;

export async function sendResetPasswordEmail(
  data: SendResetPasswordEmailRequestBody
) {
  const res = await client<{ message: string }>(
    ENDPOINTS.USER.POST_SEND_RESET_PASSWORD_EMAIL,
    {
      method: 'post',
      data,
    }
  );

  return handleApiResponse(res, '비밀번호 재설정 메일 전송에 실패했습니다.');
}

// 비밀번호 재설정 요청: 사용자가 비밀번호 재설정을 요청하면, 서버는 유효한 token을 생성하고 이를 포함한 링크를 이메일로 전송합니다.
// 링크 클릭: 사용자가 이메일 링크를 클릭하면 서버는 token을 검증하고, 사용자에게 비밀번호 재설정 페이지를 제공하거나 로그인 페이지로 리디렉션합니다.
// 세션 생성: 서버는 검증된 token을 바탕으로 사용자의 세션을 생성하고, 비밀번호 재설정 폼을 사용자에게 보여줍니다.
export async function resetPassword(data: PasswordAuthentication) {
  const sessionToken = cookies().get('sessionToken')?.value;
  const res = await client<{ message: string }>(
    ENDPOINTS.USER.PATCH_RESET_PASSWORD,
    {
      method: 'patch',
      data: {
        ...data,
        token: sessionToken,
      },
    }
  );

  if (!res.error) {
    cookies().set('sessionToken', '', { maxAge: -1, path: '/' });
    redirect('/login');
  }

  if (res?.error?.message === '유효하지 않은 토큰입니다.') {
    // 유효하지 않은 토큰일 경우 토큰 삭제
    // (쿠키에 토큰이 없어지므로 사용자는 자동적으로 랜딩페이지로 리다이렉트 됨)
    cookies().set('sessionToken', '', { maxAge: -1, path: '/' });
    return handleApiResponse(
      res,
      '유효하지 않은 토큰입니다. 비밀번호 재설정 링크를 다시 받아주세요.'
    );
  }

  return handleApiResponse(res, '비밀번호 재설정에 실패했습니다.');
}

export async function updatePassword(data: PatchPasswordRequestBody) {
  const res = await client<{ message: string }>(ENDPOINTS.USER.PATCH_PASSWORD, {
    method: 'patch',
    data,
  });

  return handleApiResponse(res, '비밀번호 업데이트에 실패했습니다.');
}
