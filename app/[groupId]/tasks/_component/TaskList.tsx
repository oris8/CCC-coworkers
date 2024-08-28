import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import SocketBind from '@/components/socket-bind';
import fetchAPI from '@/lib/api/fetchAPI';
import { DateString, Id } from '@ccc-types';
import React from 'react';

import TaskItem from './TaskItem';

async function TaskList({
  groupId,
  searchParams,
}: {
  groupId: Id;
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  const [tasksRes, userRes] = await Promise.all([
    fetchAPI.TaskList(
      groupId,
      Number(searchParams?.['task-list']),
      searchParams!.date
    ),
    fetchAPI.User(),
  ]);

  const tasksData = tasksRes.data;
  const userData = userRes.data;

  return (
    <div className="relative flex h-full flex-grow flex-col">
      <SocketBind groupId={groupId} />
      {tasksData?.tasks?.length !== 0 ? (
        <div className="mt-3 flex flex-col gap-5 pb-[45px]">
          {tasksData?.tasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task!}
              userId={userData?.id!}
              userName={userData?.nickname!}
              groupId={groupId}
            />
          ))}
        </div>
      ) : (
        <div className="mb-[120px] flex h-full items-center justify-center">
          <p className="text-sm font-medium text-text-default">
            아직 할 일이 없습니다.
            <br />할 일을 추가해보세요.
          </p>
        </div>
      )}

      <div className="fixed bottom-5 mx-auto flex w-full justify-end px-[40px] xl:max-w-[1232px] xl:px-0">
        <MakeTodoModal
          className="z-10 ml-auto"
          groupId={groupId}
          userName={userData?.nickname!}
          taskListId={Number(searchParams?.['task-list'])}
        />
      </div>
    </div>
  );
}

export default TaskList;
