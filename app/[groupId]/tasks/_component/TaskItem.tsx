'use client';

import emitGroups from '@/app/api/pusher/group/emit';
import TaskEditDeleteDropdown from '@/components/dropdown-template/TaskEditDeleteDropdown';
import frequencyTypeObj from '@/constants/frequencyType';
import { deleteRecurringTask, deleteTask } from '@/lib/api/task';
import usePusherStore from '@/lib/store';
import { dateFormatter } from '@/lib/utils';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import CommentIcon from '@/public/icons/list/comment_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import Spiner from '@/public/icons/spinner_icon.svg';
import { DetailTask, Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import CheckboxReactHookFormSingle from './Checkbox';
import CommentSheet from './CommentSheet';

const textClass = `text-xs font-normal text-text-default`;

function TaskItem({
  task,
  userId,
  userName,
  groupId,
}: {
  task: DetailTask;
  userId?: Id;
  userName?: string;
  groupId: number;
}) {
  const [isDone, setIsDone] = React.useState<boolean>(!!task.doneAt);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [deleteAll, setDeleteAll] = React.useState<boolean>(false);
  const taskType = frequencyTypeObj[task.frequency];
  const router = useRouter();
  const { socketId } = usePusherStore();

  const handleDoneState = (value: boolean) => {
    setIsDone(value);
  };

  const handleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const handleDeleteAll = (value: boolean) => {
    setDeleteAll(value);
  };

  const handleDeleteClick = async () => {
    handleLoading(true);

    const deleteFunction = deleteAll ? deleteRecurringTask : deleteTask;
    const { error } = await deleteFunction(
      deleteAll ? task.recurringId : task.id
    );

    if (error) {
      toast.error(`${error.info}`);
    } else {
      await emitGroups({
        member: userName,
        action: 'delete',
        task: task.name,
        roomId: String(groupId),
        socketId: socketId as string,
      });
      router.refresh();
      toast.success('할 일 삭제에 성공했습니다!');
    }

    handleLoading(false);
  };

  return (
    <CommentSheet
      isDone={isDone}
      task={task}
      handleClick={handleDoneState}
      userId={userId}
    >
      <div
        className={`relative flex w-full cursor-pointer flex-col gap-3 rounded-[10px] px-[14px] py-[12px] ${isLoading && 'opacity-50'} bg-background-secondary`}
      >
        {isLoading && (
          <Spiner className="rolling absolute left-[50%] top-[35%]" />
        )}
        <div className="flex w-full justify-between">
          <CheckboxReactHookFormSingle
            id={task.id}
            task={task.name}
            isDone={isDone}
            handleClick={handleDoneState}
            userName={userName}
            groupId={groupId}
          />
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <CommentIcon />
              <p className={textClass}>{task.commentCount}</p>
            </div>
            {userId === task.writer.id && (
              <TaskEditDeleteDropdown
                taskType={taskType}
                title={task.name}
                onClick={handleDeleteClick}
                taskId={task.id}
                setDelete={{ deleteAll, handleDeleteAll }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CalenderNoBtnIcon />
            <p className={textClass}>
              {dateFormatter.toConvertDate(task.updatedAt, 'koreanFullDate')}{' '}
              생성됨
            </p>
          </div>
          <div className="flex items-center gap-1">
            <DailyIcon />
            <p className={textClass}>{taskType}</p>
          </div>
        </div>
      </div>
    </CommentSheet>
  );
}

export default TaskItem;
