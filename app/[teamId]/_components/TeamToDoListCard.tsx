'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Kebab from '@/public/icons/kebab.svg';
import ToDoDoneIcon from '@/public/icons/todo_done.svg';
import stringToHex from '@/utils/StringToColor';
import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
  completed: {
    label: 'Completed',
  },
  todo: {
    label: 'Todo',
  },
};

function TeamToDoListCard({
  name,
  totalToDo,
  completedToDo,
}: {
  name: string;
  totalToDo: number;
  completedToDo: number;
}) {
  // NOTE - 동적으로 색상을 적용하기 위해 따로 빼고 useMemo로 반복되는 계산 제거
  const leftStyleColor = useMemo(() => stringToHex(name), [name]);
  const done = completedToDo === totalToDo;

  const chartData = [
    {
      name: 'completed',
      total: completedToDo,
      fill: '#10B981',
    },
    { name: 'todo', total: totalToDo - completedToDo, fill: '#FFF' },
  ];

  return (
    <div className="relative flex h-10 items-center justify-between rounded-xl bg-background-secondary py-3 pl-6 pr-2">
      <div
        className="absolute left-0 top-0 h-full w-[10px] rounded-l-xl"
        // NOTE - className에 동적 값이 적용되지 않아 style로 적용
        style={{ backgroundColor: leftStyleColor }}
      />
      <p className="text-sm font-medium">{name}</p>
      <div className="flex items-center gap-x-1">
        <div className="flex h-[25px] items-center gap-x-[1px] rounded-xl bg-background px-2 py-1 text-brand-primary">
          <div className="size-4">
            {done ? (
              <ToDoDoneIcon />
            ) : (
              <ChartContainer config={chartConfig} className="aspect-square">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="name"
                    // TODO - 원의 크기는 밖 div, innerRadius와 outerRadius로 조정 가능합니다!
                    innerRadius={6}
                    outerRadius={8}
                    strokeWidth={0}
                  />
                </PieChart>
              </ChartContainer>
            )}
          </div>
          <p>{`${completedToDo}/${totalToDo}`}</p>
        </div>
        <Kebab />
      </div>
    </div>
  );
}
export default TeamToDoListCard;
