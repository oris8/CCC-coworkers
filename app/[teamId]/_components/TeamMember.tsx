import Link from 'next/link';

import MemberCard from './MemberCard';

function TeamMember() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">할 일 목록</p>
          <p className="text-text-default">(n개)</p>
        </div>
        <Link href="/" className="text-sm text-brand-primary">
          + 새로운 멤버 추가하기
        </Link>
      </div>
      <div className="my-6 grid grid-cols-2 grid-rows-2 gap-6 md:grid-cols-3">
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        {/* TODO - Grid 이용해서 더 깔끔하게 숨기는 법 찾기 */}
        <MemberCard className="hidden md:block" />
        <MemberCard className="hidden md:block" />
      </div>
    </div>
  );
}
export default TeamMember;
