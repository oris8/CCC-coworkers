import ErrorFallbackUI from '@/components/common/ErrorFallBackUI';
import fetchAPI from '@/lib/api/fetchAPI';
import { isEmptyObject } from '@/lib/utils';
import { redirect } from 'next/navigation';

import AccountEditForm from './_components/AccountEditForm';
import WithdrawalModal from './_components/WithdrawalModal';

const Page = async () => {
  const { data: currentUserAccountInfo, error } = await fetchAPI.User();

  // 서버사이드렌더링중 에러가 나는 부분은 직접 error component를 리턴
  if (error) {
    return <ErrorFallbackUI error={error} />;
  }

  // 유저 데이터가 없으면 랜딩페이지로 리다이렉트
  if (isEmptyObject(currentUserAccountInfo)) redirect('/');

  return (
    <div className="center mx-auto w-full max-w-[792px] flex-col gap-6 px-4">
      <h1 className="mr-auto mt-12 text-[20px] font-bold xl:mt-[140px]">
        계정 정보
      </h1>
      <AccountEditForm currentUserAccountInfo={currentUserAccountInfo} />
      <div className="ml-auto">
        <WithdrawalModal />
      </div>
    </div>
  );
};

export default Page;
