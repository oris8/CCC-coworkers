/* eslint-disable no-nested-ternary */
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

import Checkbox from '../ui/checkbox';

function DeleteTodoModal({
  title,
  onClick,
  className,
  onClose,
  setDelete,
  taskType,
  type = 'task',
}: {
  title?: string;
  type?: 'task' | 'comment' | 'article';
  className?: string;
  taskType?: string;
  onClick: () => void;
  setDelete?: { deleteAll: boolean; handleDeleteAll: (value: boolean) => void };
  onClose: () => void;
}) {
  const { deleteAll, handleDeleteAll } = setDelete || {};

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
          ) : type === 'article' ? (
            <p>게시물을 정말 삭제하시겠어요?</p>
          ) : (
            <p>댓글을 정말 삭제하시겠어요?</p>
          )}
        </DialogTitle>
        <DialogDescription>삭제 후에는 되돌릴 수 없습니다.</DialogDescription>
        {taskType! !== '한번' && setDelete && (
          <div className="mb-1 flex items-center space-x-2">
            <Checkbox
              id="terms"
              onClick={() => {
                if (setDelete) {
                  handleDeleteAll!(!deleteAll);
                }
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              반복 설정한 할 일을 전부 삭제하시겠어요?
            </label>
          </div>
        )}
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
