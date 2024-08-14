'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import DoneIcon from '@/public/icons/report_done.svg';
import TodoIcon from '@/public/icons/report_todo.svg';
import { GroupTask } from '@ccc-types';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
  completed: {
    label: 'Completed',
  },
  todo: {
    label: 'Todo',
  },
};

function TeamReport({ taskLists }: { taskLists: GroupTask[] }) {
  const totalTaskCount = taskLists.reduce(
    (acc, curr) => acc + curr.tasks.length,
    0
  );
  const completedTaskCount = taskLists.reduce(
    (acc, curr) => acc + curr.tasks.filter((task) => task.doneAt).length,
    0
  );

  const chartData = [
    // NOTE - defs에서 가져와 사용할 수 있다.
    {
      name: 'completed',
      total: completedTaskCount,
      fill: 'url(#completedGradient)',
    },
    // REVIEW - todo가 없으면 차트가 나오지않는 문제가 있습니다. todo가 0일 때 일단 1이라도 주어 차트를 보이게 하였는데 다른 좋은 방법 있으면 말씀해주시면 감사하겠습니다.
    {
      name: 'todo',
      total: Math.max(totalTaskCount - completedTaskCount, 1),
      fill: '#334155',
    },
  ];

  return (
    <div className="my-12 flex flex-col gap-y-4">
      <p className="font-medium">리포트</p>
      <div className="flex h-[224px] items-center justify-between rounded-xl bg-background-secondary p-2 md:p-6">
        <div className="relative size-[120px] md:size-[140px]">
          <ChartContainer config={chartConfig} className="aspect-square">
            <PieChart>
              {/* NOTE - 그래디언트를 위한 defs */}
              <defs>
                <linearGradient
                  id="completedGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#A3E635" />
                </linearGradient>
              </defs>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="name"
                // TODO - 원의 크기는 밖 div, innerRadius와 outerRadius로 조정 가능합니다!
                innerRadius="60%"
                outerRadius="100%"
                startAngle={0}
                endAngle={-360}
                strokeWidth={0}
              />
            </PieChart>
          </ChartContainer>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center md:left-[170px] md:w-full md:translate-x-0 md:items-start md:gap-y-1">
            <p className="text-xs font-medium md:hidden">오늘</p>
            <p className="hidden text-xs font-medium md:block">
              오늘의
              <br />
              진행 상황
            </p>
            <p className="bg-gradient-to-r from-[#10B981] to-[#A3E635] bg-clip-text text-xl font-bold text-transparent md:text-[40px] md:leading-none">
              {totalTaskCount > 0
                ? Math.round((completedTaskCount / totalTaskCount) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
        <div className="flex w-[142px] flex-col gap-y-4 md:w-[280px] xl:w-[400px]">
          <div className="flex h-full items-center justify-between gap-x-3 rounded-xl bg-customBackground-teritiary p-4">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-medium text-text-secondary">
                오늘의 할 일
              </p>
              <p className="text-2xl font-bold text-brand-tertiary">
                {totalTaskCount}개
              </p>
            </div>
            <TodoIcon />
          </div>
          <div className="flex h-full items-center justify-between gap-x-3 rounded-xl bg-customBackground-teritiary p-4">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-medium text-text-secondary">한 일</p>
              <p className="text-2xl font-bold text-brand-tertiary">
                {completedTaskCount}개
              </p>
            </div>
            <DoneIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamReport;
