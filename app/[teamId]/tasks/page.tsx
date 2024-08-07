import MakeTodoModal from '@/components/modal-template/MakeTodoModal';

import TaskList from './_component/TaskList';

function ListPage() {
  return (
    <section className="relative mx-auto xl:max-w-[1232px]">
      <div className="flex w-full flex-col gap-6 px-4">
        <h1 className="mr-auto mt-6 text-[18px] font-bold text-text-primary">
          할 일
        </h1>
        {/** NOTE - 지금은 prop이 따로 없고 API 연동하면 내려줄 생각입니다! */}
        <TaskList />
      </div>
      <div className="fixed bottom-5 mx-auto flex w-full max-w-[1232px] justify-end px-4 xl:px-0">
        <MakeTodoModal className="z-10 ml-auto" />
      </div>
    </section>
  );
}

export default ListPage;
