import { DateString, Id } from '@ccc-types';

import TaskDateController from './_component/TaskDateController';
import TaskList from './_component/TaskList';
import TaskListTags from './_component/TaskListTags';

async function ListPage({
  params,
  searchParams,
}: {
  params: { groupId: Id };
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  const { groupId } = params;

  return (
    <section className="min-screen relative flex flex-col gap-6">
      <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
        할 일
      </h1>
      <div className="mb-[-5px] flex items-center">
        <TaskDateController />
      </div>
      {groupId && <TaskListTags groupId={groupId} />}
      <TaskList groupId={groupId} searchParams={searchParams} />
    </section>
  );
}

export default ListPage;
