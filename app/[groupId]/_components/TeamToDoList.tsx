'use client';

import TodoListModal from '@/components/modal-template/TodoListModal';
import { GroupTask } from '@ccc-types';
import Link from 'next/link';

import TeamToDoListCard from './TeamToDoListCard';

function TeamToDoList({
  taskLists,
  groupId,
}: {
  taskLists: GroupTask[];
  groupId: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <p className="font-medium">할 일 목록</p>
          <p className="text-text-default">({taskLists?.length ?? 0}개)</p>
        </div>
        <TodoListModal groupId={groupId} />
      </div>
      <div className="flex flex-col gap-4">
        {taskLists.length !== 0 ? (
          taskLists.map((taskList) => (
            <Link
              href={`/${groupId}/tasks?task-list=${taskList.id}&date=${new Date().toString()}`}
            >
              <TeamToDoListCard
                key={taskList.id}
                name={taskList.name}
                totalToDo={taskList.tasks.length}
                completedToDo={
                  taskList.tasks.filter((task) => task.doneAt !== null).length
                }
                groupId={groupId}
                taskListId={taskList.id}
              />
            </Link>
          ))
        ) : (
          <div className="flex w-full items-center justify-center py-16">
            <p className="text-sm font-medium text-text-default">
              아직 할 일 목록이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default TeamToDoList;
