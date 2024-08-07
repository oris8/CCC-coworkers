'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import DatePicker from '@/app/[teamId]/tasks/_component/DatePicker';
import TodoListModal from '@/components/modal-template/TodoListModal';
import LeftButtonIcon from '@/public/icons/list/left_button_icon.svg';
import RightButtonIcon from '@/public/icons/list/right_button_icon.svg';
import { formatToDate } from '@/utils/dateFormat';
import { GroupTask } from '@ccc-types';
import React, { Suspense, useEffect, useState } from 'react';

import TaskItem from './TaskItem';

const MockDataList: GroupTask = {
  groupId: 0,
  displayIndex: 0,
  updatedAt: '2024-07-31T10:43:33.797Z',
  createdAt: '2024-07-31T10:43:33.797Z',
  name: '법인 설립',
  id: 1,
  tasks: [
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      doneAt: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '등기 비용 안내드리기',
      id: 1,
    },
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '사기치면 안된다!',
      id: 2,
    },
    {
      deletedAt: '2024-07-31T09:35:03.957Z',
      recurringId: 0,
      frequency: 'DAILY',
      userId: 0,
      date: '2024-07-31T09:35:03.957Z',
      doneAt: '2024-07-31T09:35:03.957Z',
      updatedAt: '2024-07-31T09:35:03.957Z',
      name: '항상 정의롭게 벌자',
      id: 3,
    },
  ],
};

function TaskList() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [taskList, setTaskList] = useState<GroupTask | undefined>(undefined);
  const oneDay = 24 * 60 * 60 * 1000;

  const handlePrevDate = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - oneDay));
  };

  const handleNextDate = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + oneDay));
  };

  const handleDateChange = React.useCallback((value: Date) => {
    setCurrentDate(value);
  }, []);

  const handleTasks = () => {
    setTaskList(MockDataList);
  };

  useEffect(() => {
    setTaskList(MockDataList);
  }, [currentDate]);

  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex items-center">
        <span className="w-[100px] text-[16px] font-medium text-text-primary">
          {formatToDate(currentDate, 'monthAndDay')}
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
      {MockDataList.name ? (
        <>
          <ul className="my-2 flex gap-3">
            {taskList?.id && (
              <li
                key={taskList.id}
                onClick={handleTasks}
                className={`cursor-pointer text-base font-medium text-text-default ${taskList.id === MockDataList.id && 'border-b-2 border-text-primary pb-[3px] text-text-primary'}`}
              >
                {taskList.name}
              </li>
            )}
          </ul>
          <Suspense fallback={<div>Loading...</div>}>
            {taskList?.tasks.length !== 0 ? (
              <div className="flex flex-col gap-5">
                {taskList?.tasks.map((task) => (
                  <TaskItem key={task.id} {...task} />
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
          </Suspense>
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
