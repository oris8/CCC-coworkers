'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { GroupTask } from '@ccc-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function TaskListTags({ taskListsData }: { taskListsData: GroupTask[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (taskId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('task-list', taskId);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="my-2 flex gap-3">
      {taskListsData?.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            handleClick(item.id.toString());
          }}
          className={`cursor-pointer text-base font-medium text-text-default ${
            item.id === Number(searchParams.get('task-list')) &&
            'border-b-2 border-text-primary pb-[3px] text-text-primary'
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
export default TaskListTags;
