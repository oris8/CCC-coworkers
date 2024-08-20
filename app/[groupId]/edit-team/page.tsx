import ErrorFallbackUI from '@/components/common/error/ErrorFallback';
import fetchAPI from '@/lib/api/fetchAPI';
import { Id } from '@ccc-types';

import EditTeamForm from '../_components/editTeamForm';

export default async function EditTeam({
  params,
}: {
  params: { groupId: Id };
}) {
  const { data: groupData, error } = await fetchAPI.Group(params.groupId);

  if (error) {
    return <ErrorFallbackUI error={error} />;
  }
  return (
    <div className="mx-auto mt-[140px] w-full max-w-[460px] items-center justify-between">
      <h2 className="mb-[80px] text-center text-[40px] font-medium">
        팀 수정하기
      </h2>
      <EditTeamForm groupData={groupData} />
      <p className="mt-[24px] text-center">
        팀 이름은 회사명이나 모임 이름으로 설정하면 좋아요.
      </p>
    </div>
  );
}
