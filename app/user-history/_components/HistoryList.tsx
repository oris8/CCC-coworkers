'use client';

import { formatToDate } from '@/utils/dateFormat';
import { Task } from '@ccc-types';
import React from 'react';

import HistoryItem from './HistoryItem';

const HistoryList = ({ tasksDone }: { tasksDone: Task[] }) => {
  const date =
    tasksDone[0].doneAt && formatToDate(tasksDone[0].doneAt, 'dotFormat');

  return (
    <div className="flex w-full flex-col gap-4">
      <h2>{date}</h2>
      {tasksDone.map((task) => (
        <HistoryItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default HistoryList;
