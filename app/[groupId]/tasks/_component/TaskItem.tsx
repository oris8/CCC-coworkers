'use client';

import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import frequencyTypeObj from '@/constants/frequencyType';
import useRequestFunction from '@/hooks/useRequestFunction';
import { deleteTask } from '@/lib/api/task';
import { dateFormatter } from '@/lib/utils';
import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import CommentIcon from '@/public/icons/list/comment_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { Task } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React from 'react';

import CheckboxReactHookFormSingle from './Checkbox';
import CommentSheet from './CommentSheet';

const textClass = `text-xs font-normal text-text-default`;

function TaskItem({ task }: { task: Task }) {
  const [isDone, setIsDone] = React.useState<boolean>(!!task.doneAt);
  const taskType = frequencyTypeObj[task.frequency];
  const router = useRouter();

  const handleDoneState = (value: boolean) => {
    setIsDone(value);
  };

  const { isLoading, request } = useRequestFunction(deleteTask);

  const handleDeleteClick = async () => {
    try {
      await request(task.id);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
    // await deleteTask(task.id);
    // router.refresh();
  };

  // if (isError) {
  //   return <ErrorFallbackUI />;
  // }

  return (
    <CommentSheet isDone={isDone} task={task} handleClick={handleDoneState}>
      <div
        className={`${isLoading && 'bg-white'}flex w-full cursor-pointer flex-col gap-3 rounded-[10px] bg-background-secondary px-[14px] py-[12px]`}
      >
        <div className="flex w-full justify-between">
          <CheckboxReactHookFormSingle
            id={task.id}
            task={task.name}
            isDone={isDone}
            handleClick={handleDoneState}
          />
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <CommentIcon />
              <p className={textClass}>{task.commentCount}</p>
            </div>
            <EditDeleteDropdown title={task.name} onClick={handleDeleteClick} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CalenderNoBtnIcon />
            <p className={textClass}>
              {dateFormatter.toConvertDate(task.updatedAt, 'koreanFullDate')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon />
            <p className={textClass}>{dateFormatter.toTime(task.updatedAt)}</p>
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
