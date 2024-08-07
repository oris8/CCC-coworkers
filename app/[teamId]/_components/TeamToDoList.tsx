import Link from 'next/link';

import TeamToDoListCard from './TeamToDoListCard';

function TeamToDoList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">할 일 목록</p>
          <p className="text-text-default">(4개)</p>
        </div>
        <Link href="/" className="text-sm text-brand-primary">
          + 새로운 목록 추가하기
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <TeamToDoListCard
          name="프로젝트 빠르게 완료하기"
          totalToDo={10}
          completedToDo={2}
        />
        <TeamToDoListCard name="Go To Mars" totalToDo={5} completedToDo={3} />
        <TeamToDoListCard name="12334" totalToDo={8} completedToDo={8} />
        <TeamToDoListCard
          name="점심 메뉴 정하기"
          totalToDo={20}
          completedToDo={12}
        />
      </div>
    </div>
  );
}
export default TeamToDoList;
