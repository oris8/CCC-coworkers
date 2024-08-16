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
import React, { MouseEvent } from 'react';

function DeleteTodoModal({
  title,
  className,
  onClick,
}: {
  title?: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <button
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
          }}
        >
          삭제하기
        </button>
      </DialogTrigger>
      <DialogContent
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <WarningIcon />
        <DialogTitle className="mb-[-10px] flex flex-col gap-3 text-center">
          {title && <p>&apos;{title}&apos;</p>}
          <p>할 일을 정말 삭제하시겠어요?</p>
        </DialogTitle>
        <DialogDescription>삭제 후에는 되돌릴 수 없습니다.</DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            {/** NOTE - DELETE 로직 추가 전에 임시로 이벤트 버블링 방지를 위해 함수 할당 */}
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
