'use client';

import { formatToDate } from '@/utils/dateFormat';
import { Task } from '@ccc-types';
import React from 'react';

import HistoryItem from './HistoryItem';

const HistoryList = ({ tasks }: { tasks: Task[] }) => {
  const date = formatToDate(tasks[0].deletedAt, 'dotFormat');

  return (
    <div className="flex w-full flex-col gap-4">
      <h2>{date}</h2>
      {tasks.map((task) => (
        <HistoryItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default HistoryList;
