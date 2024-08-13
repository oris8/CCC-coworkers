'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import TodoListModal from '@/components/modal-template/TodoListModal';
import fetchAPI from '@/lib/api/fetchAPI';
import { dateFormatter } from '@/lib/utils';
import LeftButtonIcon from '@/public/icons/list/left_button_icon.svg';
import RightButtonIcon from '@/public/icons/list/right_button_icon.svg';
import { DateString, GroupTask, Id, Task } from '@ccc-types';
import React, { useEffect, useState } from 'react';

import DatePicker from './DatePicker';
import TaskItem from './TaskItem';

function TaskList({ data, groupId }: { data: GroupTask[]; groupId: Id }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [taskList, setTaskList] = useState<Task[] | undefined>(undefined);
  const [taskListId, setTaskListId] = useState<Id>(data[0].id);
  const oneDay = 24 * 60 * 60 * 1000;

  const fetchData = async (
    groupIdValue: Id,
    taskListIdValue: Id,
    date: DateString
  ) => {
    const res = await fetchAPI.Tasks(groupIdValue, taskListIdValue, date);
    if (res.error) {
      console.log(res.error);
    } else {
      setTaskList(res.data);
    }
  };

  const handlePrevDate = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - oneDay));
  };

  const handleNextDate = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + oneDay));
  };

  const handleDateChange = React.useCallback((value: Date) => {
    setCurrentDate(value);
  }, []);

  useEffect(() => {
    fetchData(groupId, taskListId, currentDate.toString());
  }, [groupId, taskListId, currentDate]);

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex items-center">
        <span className="w-[100px] text-[16px] font-medium text-text-primary">
          {dateFormatter.toConvertDate(currentDate, 'monthAndDay')}
        </span>
        <div className="relative top-[1px] mr-4 flex gap-2">
          <button
            type="button"
            aria-label="날짜 변경 버튼(왼쪽)"
            onClick={handlePrevDate}
          >
            <LeftButtonIcon />
          </button>
          <button
            type="button"
            aria-label="날짜 변경 버튼(오른쪽)"
            onClick={handleNextDate}
          >
            <RightButtonIcon />
          </button>
        </div>
        <DatePicker onClick={handleDateChange} />
        <TodoListModal className="ml-auto" />
      </div>
      {data?.length !== 0 ? (
        <>
          <ul className="my-2 flex gap-3">
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setTaskListId(item.id);
                }}
                className={`cursor-pointer text-base font-medium text-text-default ${item.id === taskListId && 'border-b-2 border-text-primary pb-[3px] text-text-primary'}`}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {taskList?.length !== 0 ? (
            <div className="mt-3 flex flex-col gap-5">
              {taskList?.map((task) => <TaskItem key={task.id} task={task} />)}
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
    </div>
  );
}

export default TaskList;
