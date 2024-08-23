'use client';

import TaskEditDeleteDropdown from '@/components/dropdown-template/TaskEditDeleteDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import fetchAPI from '@/lib/api/fetchAPI';
import { deleteTask, updateTask } from '@/lib/api/task';
import CheckIcon from '@/public/icons/button/check_icon.svg';
import NoCommentIcon from '@/public/icons/no_comment_icon.svg';
import Spinner from '@/public/icons/spinner_icon.svg';
import { Comment, DetailTask, Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentMeta from './CommentMeta';

interface FormData {
  name?: string;
  description?: string;
  done: boolean;
}

type OmiitedComment = Omit<Comment, 'taskId' | 'userId'>;

export default function CommentSheet({
  children,
  isDone,
  task,
  handleClick,
  userId,
}: {
  children: React.ReactNode;
  isDone: boolean;
  task: DetailTask;
  handleClick: (value: boolean) => void;
  userId?: Id;
}) {
  const [commentList, setCommentList] = React.useState<
    Comment[] | OmiitedComment[] | null
  >(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    done: isDone,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const fetchData = async (idValue: Id) => {
    setIsLoading(true);
    const res = await fetchAPI.Comments(idValue);
    if (res.error) {
      setIsLoading(false);
      toast.error(`${res.error.info}`);
    } else {
      setIsLoading(false);
      const newCommentList = res.data;
      newCommentList.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCommentList(newCommentList);
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
      toast.error('할 일 완료 여부 변경에 실패하였습니다.');
    }
  };

  const handleDeleteClick = async () => {
    setIsOpen(false);
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      router.refresh();
    } catch (e) {
      toast.error('할 일 삭제에 실패하였습니다.');
    }
  };

  const handleCommentList = (
    type: 'post' | 'patch' | 'delete',
    value?: Comment,
    id?: Id
  ) => {
    if (type === 'post' && value) {
      setCommentList((prev) => [value, ...(prev || [])]);
    } else if (type === 'patch' && value) {
      const updatedCommentList = commentList?.map((comment) =>
        comment.id === id ? { ...comment, content: value.content } : comment
      );
      if (updatedCommentList) {
        setCommentList(updatedCommentList);
      }
    } else if (type === 'delete') {
      const updatedComment = commentList?.filter(
        (comment) => comment.id !== id
      );
      if (updatedComment) {
        setCommentList(updatedComment);
      }
    }
  };

  useEffect(() => {
    if (isOpen && task.id && commentList === null) {
      fetchData(task.id);
    }
  }, [isOpen, task.id, commentList]);

  return (
    <Sheet onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={`mt-[60px] w-full ${isDeleting && 'opacity-70'} md:max-w-[435px] xl:max-w-[778px]`}
      >
        {isDeleting && (
          <p className="text-sm font-bold text-status-danger">삭제중...</p>
        )}
        {isDone && (
          <div className="flex items-center gap-[6px] text-brand-tertiary">
            <CheckIcon />
            <p>완료</p>
          </div>
        )}
        <SheetTitle className="flex items-center justify-between">
          <p className={isDone ? 'line-through' : ''}>{task.name}</p>
          {userId === task.writer.id && (
            <TaskEditDeleteDropdown
              title={task.name}
              taskId={task.id}
              className="h-[24px] w-[24px]"
              onClick={handleDeleteClick}
            />
          )}
        </SheetTitle>
        <CommentMeta task={task} />
        <SheetDescription className="relative mt-2 min-h-[150px]">
          {task.description}
          <Button
            variant={isDone ? 'floating-outlined' : 'floating'}
            className="absolute bottom-0 right-0"
            onClick={handleTaskToggle}
          >
            <CheckIcon className="stroke-brand-primary" />
            &nbsp;{isDone ? '완료 취소하기' : '완료하기'}
          </Button>
        </SheetDescription>
        <CommentForm id={task.id} handleData={handleCommentList} />

        {isLoading && commentList === null && (
          <div className="mb-[60px] flex h-full items-center justify-center">
            <Spinner className="rolling" width={36} height={36} />
          </div>
        )}

        {commentList !== null &&
          (commentList?.length !== 0 ? (
            <div className="custom-scroll mt-[-20px] h-full w-full overflow-scroll pb-[40px]">
              {commentList?.map((comment) => (
                <CommentItem
                  key={comment.id}
                  {...comment}
                  handleData={handleCommentList}
                  userId={userId}
                />
              ))}
            </div>
          ) : (
            <div
              className={`${isLoading && 'hidden'} mb-[60px] flex h-full flex-col items-center justify-center gap-3`}
            >
              <NoCommentIcon
                width={80}
                height={80}
                className="fill-brand-primary"
              />
              <p className="text-text-default">아직 작성된 댓글이 없습니다.</p>
            </div>
          ))}
      </SheetContent>
    </Sheet>
  );
}
