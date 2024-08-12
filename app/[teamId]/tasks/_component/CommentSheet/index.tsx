import EditDeleteDropdown from '@/components/dropdown-template/EditDeleteDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CheckIcon from '@/public/icons/button/check_icon.svg';
import { Comment } from '@ccc-types';
import React from 'react';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import CommentMeta from './CommentMeta';

const commentMockData: Comment[] = [
  {
    user: {
      teamId: 'string',
      image: 'string',
      nickname: '정성실',
      updatedAt: '2024-08-01T08:12:17.709Z',
      createdAt: '2024-08-01T08:12:17.709Z',
      encryptedPassword: 'string',
      email: 'string',
      id: 0,
    },
    userId: 0,
    taskId: 0,
    updatedAt: '2024-08-01T08:12:17.709Z',
    createdAt: '2024-08-01T08:12:17.709Z',
    content:
      '혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?혹시 관련해서 미팅 오늘 중으로 가능하신가요?',
    id: 0,
  },
  {
    user: {
      teamId: 'string',
      image: 'string',
      nickname: '김엠지',
      updatedAt: '2024-08-02T08:12:17.709Z',
      createdAt: '2024-08-02T08:12:17.709Z',
      encryptedPassword: 'string',
      email: 'string',
      id: 1,
    },
    userId: 0,
    taskId: 0,
    updatedAt: '2024-08-02T08:12:17.709Z',
    createdAt: '2024-08-02T08:12:17.709Z',
    content: '너무 힘들어서 퇴사하겠습니다..',
    id: 1,
  },
];

export default function CommentSheet({
  children,
  done,
}: {
  children: React.ReactNode;
  done: boolean;
}) {
  const [isTaskDone, setIsTaskDone] = React.useState<boolean>(done);

  const handleTaskToggle = () => {
    setIsTaskDone((prev) => !prev);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="mt-[60px] w-full md:max-w-[435px] xl:max-w-[778px]">
        {isTaskDone && (
          <div className="flex items-center gap-[6px] text-brand-tertiary">
            <CheckIcon />
            <p>완료</p>
          </div>
        )}
        <SheetTitle className="flex items-center justify-between">
          <p className={isTaskDone ? 'line-through' : ''}>
            법인 설립 비용 안내드리기
          </p>
          <EditDeleteDropdown className="h-[24px] w-[24px]" />
        </SheetTitle>
        <CommentMeta />
        <SheetDescription className="mt-2 min-h-[150px]">
          필수 정보 어쩌고..
        </SheetDescription>
        <CommentForm />
        {commentMockData.map((commentData) => (
          <CommentItem key={commentData.id} {...commentData} />
        ))}
        <Button
          variant={isTaskDone ? 'floating-outlined' : 'floating'}
          className="absolute bottom-[80px] right-4"
          onClick={handleTaskToggle}
        >
          <CheckIcon className="stroke-brand-primary" />
          &nbsp;{isTaskDone ? '완료 취소하기' : '완료하기'}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
