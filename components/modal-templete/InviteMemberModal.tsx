import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

export default function InviteMemberModal({ className = '', ...props }) {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        <button
          type="button"
          className="text-[14px] font-normal text-brand-primary"
        >
          + 새로운 멤버 추가하기
        </button>
      </DialogTrigger>
      <DialogContent hasCloseIcon>
        <DialogTitle>멤버 초대</DialogTitle>
        <DialogDescription className="mb-6">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </DialogDescription>
        <DialogClose asChild>
          <Button className="w-[280px]" {...props}>
            링크 복사하기
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
