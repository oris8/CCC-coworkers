'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { copyText } from '@/lib/utils';
// import { Member } from '@ccc-types';
import Image from 'next/image';
import React, { ReactNode } from 'react';

import { Button } from '../ui/button';

const userMockData = {
  role: 'ADMIN',
  userImage: null,
  userEmail: 'wooo1111@naver.com',
  userName: '우지은',
  groupId: 0,
  userId: 0,
};

function EmailCopyModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent hasCloseIcon className="max-w-[344px]">
        <DialogTitle>
          <div className="relative size-[52px] rounded-full">
            <Image
              src={`${userMockData.userImage ? userMockData.userImage : '/images/basic_profile.png'}`}
              alt="멤버 프로필 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </DialogTitle>
        <DialogDescription>
          <p className="mt-2 text-center text-sm font-medium text-text-primary">
            {userMockData.userName}
          </p>
          <p className="mt-2 text-[12px] font-normal text-text-secondary">
            {userMockData.userEmail}
          </p>
        </DialogDescription>
        <Button
          className="mt-3 w-[280px]"
          onClick={() => copyText(userMockData.userEmail, '이메일')}
        >
          이메일 복사하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EmailCopyModal;
