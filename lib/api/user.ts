'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import { Email, Nickname, Password, UrlType } from '@ccc-types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUser(user: {
  nickname?: Nickname;
  image?: UrlType;
}): Promise<{ message: string }> {
  const { error } = await client<{ message: string }>(ENDPOINTS.USER.ACTIONS, {
    method: 'patch',
    data: user,
  });
  if (error) {
    throw new Error('유저 정보를 업데이트 하는 중 에러가 발생했습니다.', {
      cause: error,
    });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function deleteUser(): Promise<boolean> {
  const { error } = await client<void>(ENDPOINTS.USER.ACTIONS, {
    method: 'delete',
  });
  if (error) {
    throw new Error('유저 삭제에 실패했습니다.', { cause: error });
  }
  return true;
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

type ResetPasswordRequestBody = PasswordAuthentication & {
  token: string; // POST user/send-reset-password-email 요청으로 발송한 메일의 링크에 담긴 토큰
};

type PatchPasswordRequestBody = PasswordAuthentication;

export async function sendResetPasswordEmail(
  data: SendResetPasswordEmailRequestBody
): Promise<{ message: string }> {
  const { data: response, error } = await client<{ message: string }>(
    ENDPOINTS.USER.POST_SEND_RESET_PASSWORD_EMAIL,
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    throw new Error('비밀번호 재설정 메일 전송에 실패했습니다', {
      cause: error,
    });
  }
  return response;
}

// 비밀번호 재설정 이메일 전송
// {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다.
// e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"

// 비밀번호 재설정 요청: 사용자가 비밀번호 재설정을 요청하면, 서버는 유효한 token을 생성하고 이를 포함한 링크를 이메일로 전송합니다.
// 링크 클릭: 사용자가 이메일 링크를 클릭하면 서버는 token을 검증하고, 사용자에게 비밀번호 재설정 페이지를 제공하거나 로그인 페이지로 리디렉션합니다.
// 세션 생성: 서버는 검증된 token을 바탕으로 사용자의 세션을 생성하고, 비밀번호 재설정 폼을 사용자에게 보여줍니다.
export async function resetPassword(
  data: ResetPasswordRequestBody
): Promise<{ message: string }> {
  const { data: response, error } = await client<{ message: string }>(
    ENDPOINTS.USER.PATCH_RESET_PASSWORD,
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    throw new Error('비밀번호 재설정에 실패했습니다', { cause: error });
  }
  return response;
}

export async function updatePassword(
  data: PatchPasswordRequestBody
): Promise<{ message: string }> {
  const { data: response, error } = await client<{ message: string }>(
    ENDPOINTS.USER.PATCH_PASSWORD,
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    throw new Error('비밀번호 업데이트에 실패했습니다.', { cause: error });
  }
  return response;
}
