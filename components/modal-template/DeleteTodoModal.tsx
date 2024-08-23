import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import WarningIcon from '@/public/icons/modal/warning_icon.svg';
import React, { MouseEvent } from 'react';

function DeleteTodoModal({
  title,
  onClick,
  className,
  onClose,
  type = 'task',
}: {
  title?: string;
  type?: 'task' | 'comment';
  className?: string;
  onClick: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className={className}
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <WarningIcon />
        <DialogTitle className="mb-[-10px] flex flex-col gap-3 text-center">
          {type === 'task' ? (
            <>
              {title && <p>&apos;{title}&apos;</p>}
              <p>할 일을 정말 삭제하시겠어요?</p>
            </>
          ) : (
            <p>댓글을 정말 삭제하시겠어요?</p>
          )}
        </DialogTitle>
        <DialogDescription>삭제 후에는 되돌릴 수 없습니다.</DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger" onClick={onClick}>
              삭제
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTodoModal;
