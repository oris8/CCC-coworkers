import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import WarningIcon from '@/public/icons/modal/warning_icon.svg';
import React from 'react';

function DeleteTodoModal({
  title,
  className,
  ...props
}: {
  title: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <button type="button">삭제하기</button>
      </DialogTrigger>
      <DialogContent>
        <WarningIcon />
        <DialogTitle className="mb-[-10px] flex flex-col gap-3 text-center">
          <p>&apos;{title}&apos;</p>
          <p>할 일을 정말 삭제하시겠어요?</p>
        </DialogTitle>
        <DialogDescription>삭제 후에는 되돌릴 수 없습니다.</DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger" {...props}>
              삭제
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTodoModal;
