import { resetPassword } from '@/lib/api/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import UpdatePasswordForm from './UpdatePasswordForm';

const Page = async () => {
  const getToken = async () => {
    'use server';

    return cookies().get('sessionToken')?.value;
  };

  // 토큰 없이 바로 reset-password 로 접근하면 랜딩페이지로 리다이렉트
  const token = await getToken();
  if (!token) redirect('/');

  return (
    <div className="center mx-auto w-full max-w-[460px] flex-col gap-6 px-4">
      <h1 className="mr-auto mt-12 text-[20px] font-bold xl:mt-[140px]">
        비밀번호 재설정
      </h1>
      <UpdatePasswordForm onSubmit={resetPassword} />
    </div>
  );
};

export default Page;
