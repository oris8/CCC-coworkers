import CreateTeamForm from './_components/createTeamForm';

export default function CreateTeam() {
  return (
    <div className="mx-auto mt-[140px] w-full max-w-[460px] items-center justify-between">
      <h2 className="mb-[80px] text-center text-[40px] font-medium">
        팀 생성하기
      </h2>
      <CreateTeamForm />
      <p className="mt-[24px] text-center">
        팀 이름은 회사명이나 모임 이름으로 설정하면 좋아요.
      </p>
    </div>
  );
}
