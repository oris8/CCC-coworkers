'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import TodoListModal from '@/components/modal-template/TodoListModal';
import { Skeleton } from '@/components/ui/skeleton';
import fetchAPI from '@/lib/api/fetchAPI';
import { GroupTask, Id } from '@ccc-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function TaskListTags({ groupId }: { groupId: Id }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [tag, setTag] = useState<Omit<GroupTask, 'tasks'>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchListData = async (value: Id) => {
    const res = await fetchAPI.Group(value);
    if (res.data) {
      setTag(res.data.taskLists);
      setIsLoading(false);
    }
  };

  const setNewList = (newList: Omit<GroupTask, 'tasks'>) => {
    setTag((prev) => [...prev, newList]);
  };

  const handleClick = (taskId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('task-list', taskId);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchListData(groupId);
  }, [groupId]);

  return (
    <nav className="relative flex items-center justify-between">
      {isLoading ? (
        <div className="mb-[-20px] flex gap-2 overflow-hidden">
          <Skeleton className="h-[30px] w-[120px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[70px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[230px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[300px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[160px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[190px] bg-customBackground-teritiary" />
          <Skeleton className="h-[30px] w-[120px] bg-customBackground-teritiary" />
        </div>
      ) : (
        <ul className="task-list-scroll my-2 mb-[-20px] flex gap-3 max-xl:overflow-x-auto">
          {tag?.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                handleClick(item.id.toString());
              }}
              className={`cursor-pointer whitespace-nowrap text-base font-medium text-text-default ${
                item.id === Number(searchParams.get('task-list')) &&
                'border-b-2 border-text-primary pb-[3px] text-text-primary'
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      <div className="absolute right-0 top-[-43px]">
        <TodoListModal
          handleList={setNewList}
          groupId={groupId}
          className="ml-auto"
        />
      </div>
    </nav>
  );
}
export default TaskListTags;
