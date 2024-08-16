import MakeTodoModal from '@/components/modal-template/MakeTodoModal';
import TodoListModal from '@/components/modal-template/TodoListModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { DateString, Id } from '@ccc-types';
import React from 'react';

import TaskDateController from './TaskDateController';
import TaskItem from './TaskItem';
import TaskListTags from './TaskListTags';

async function TaskList({
  groupId,
  searchParams,
}: {
  groupId: Id;
  searchParams?: { 'task-list': Id; date: DateString };
}) {
  // 두 API 요청을 동시에 실행
  const [groupRes, tasksRes] = await Promise.all([
    fetchAPI.Group(groupId),
    fetchAPI.TaskList(
      groupId,
      Number(searchParams?.['task-list']),
      searchParams!.date
    ),
  ]);

  // 그룹 데이터 처리
  if (groupRes.error) {
    console.log(groupRes.error);
    return <div>그룹 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 태스크 리스트 처리
  const taskListsData = groupRes.data.taskLists;
  // 태스크 데이터 처리
  const tasksData = tasksRes.data;

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex items-center">
        <TaskDateController />
        <TodoListModal groupId={groupId} className="ml-auto" />
      </div>
      {taskListsData?.length !== 0 ? (
        <>
          <TaskListTags taskListsData={taskListsData} />
          {tasksData?.tasks?.length !== 0 ? (
            <div
              className={`mt-3 flex ${tasksData?.tasks?.length === 0 && 'min-h-full'} flex-col gap-5 pb-[45px]`}
            >
              {tasksData?.tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
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
        </>
      ) : (
        <div className="mb-[120px] flex h-full items-center justify-center">
          <p className="text-sm font-medium text-text-default">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
          </p>
        </div>
      )}
      <div className="sticky bottom-5 mx-auto flex w-full max-w-[1232px] justify-end xl:px-0">
        <MakeTodoModal
          className="z-10 ml-auto"
          groupId={groupId}
          taskListId={Number(searchParams?.['task-list'])}
        />
      </div>
    </div>
  );
}

export default TaskList;
