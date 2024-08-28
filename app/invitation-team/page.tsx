import fetchAPI from '@/lib/api/fetchAPI';

import InvitationTeamForm from './_component/invitationTeamForm';

export default async function InvitationTeam() {
  const { data } = await fetchAPI.User();

  return (
    <div className="mx-auto mb-[50px] mt-[140px] w-full max-w-[460px] items-center justify-between p-4">
      <h2 className="mb-[80px] text-center text-[40px] font-medium">
        팀 참여하기
      </h2>
      <InvitationTeamForm userEmail={data?.email!} />
      <p className="mt-[24px] text-center">
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </p>
    </div>
  );
}
