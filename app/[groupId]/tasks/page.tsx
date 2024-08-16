import { DateString, Id } from '@ccc-types';

import TaskList from './_component/TaskList';

async function ListPage({
  params,
  searchParams,
}: {
  params: { groupId: Id };
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  const { groupId } = params;

  return (
    <section className="min-screen relative">
      <div className="flex h-full w-full flex-col gap-6">
        <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
          할 일
        </h1>
        <TaskList groupId={groupId} searchParams={searchParams} />
      </div>
    </section>
  );
}

export default ListPage;
