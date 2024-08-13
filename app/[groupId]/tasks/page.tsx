import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { Id } from '@ccc-types';

import TaskList from './_component/TaskList';

async function ListPage({ params }: { params: { groupId: Id } }) {
  const { groupId } = params;

  let data;
  const res = await fetchAPI.Group(groupId);
  if (res.error) {
    console.log(res.error);
  } else {
    data = res.data.taskLists;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <section className="min-screen relative mx-auto xl:max-w-[1232px]">
      <div className="flex h-full w-full flex-col gap-6 px-4">
        <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
          할 일
        </h1>
        {/** NOTE - 지금은 prop이 따로 없고 API 연동하면 내려줄 생각입니다! */}
        <TaskList data={data} groupId={groupId} />
      </div>
      <div className="absolute bottom-5 mx-auto flex w-full max-w-[1232px] justify-end px-4 xl:px-0">
        <MakeTodoModal className="z-10 ml-auto" />
      </div>
    </section>
  );
}

export default ListPage;
