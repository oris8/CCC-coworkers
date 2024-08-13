'use client';

import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import fetchAPI from '@/lib/api/fetchAPI';
import { updateTask } from '@/lib/api/task';
import CheckIcon from '@/public/icons/button/check_icon.svg';
import { Comment, DetailTask, Id, Task } from '@ccc-types';
import React, { useEffect } from 'react';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentMeta from './CommentMeta';

interface FormData {
  name?: string;
  description?: string;
  done: boolean;
}

export default function CommentSheet({
  children,
  isDone,
  task,
  handleClick,
}: {
  children: React.ReactNode;
  isDone: boolean;
  task: Task;
  handleClick: (value: boolean) => void;
}) {
  const [detailTask, setDetailTask] = React.useState<DetailTask | undefined>(
    undefined
  );
  const [commentList, setCommentList] = React.useState<Comment[] | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    done: isDone,
  });

  const fetchData = async (idValue: Id) => {
    const res = await fetchAPI.Task(idValue);
    if (res.error) {
      console.error(res.error);
    } else {
      setDetailTask(res.data);
      setCommentList(res.data.comments);
    }
  };

  const handleTaskToggle = async () => {
    const newFormData = {
      ...formData,
      done: !isDone,
    };
    setFormData(newFormData);
    handleClick(!isDone);
    try {
      await updateTask(task.id, newFormData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen && task.id) {
      fetchData(task.id);
    }
  }, [isOpen, task.id]);

  return (
    <Sheet onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="mt-[60px] w-full md:max-w-[435px] xl:max-w-[778px]">
        {detailTask && isDone && (
          <div className="flex items-center gap-[6px] text-brand-tertiary">
            <CheckIcon />
            <p>완료</p>
          </div>
        )}
        <SheetTitle className="flex items-center justify-between">
          <p className={isDone ? 'line-through' : ''}>
            {detailTask && detailTask.recurring.name}
          </p>
          <EditDeleteDropdown className="h-[24px] w-[24px]" />
        </SheetTitle>
        {detailTask && <CommentMeta detailTask={detailTask} />}
        <SheetDescription className="mt-2 min-h-[150px]">
          {detailTask && detailTask.recurring.description}
        </SheetDescription>
        <CommentForm />
        {commentList?.length !== 0 &&
          commentList?.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        <Button
          variant={isDone ? 'floating-outlined' : 'floating'}
          className="absolute bottom-[80px] right-4"
          onClick={handleTaskToggle}
        >
          <CheckIcon className="stroke-brand-primary" />
          &nbsp;{isDone ? '완료 취소하기' : '완료하기'}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
