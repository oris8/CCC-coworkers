'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useRequestFunction from '@/hooks/useRequestFunction';
import { deleteMember } from '@/lib/api/group';
import { isUserAdminOfGroup } from '@/lib/utils';
import WarningIcon from '@/public/icons/modal/warning_icon.svg';
import { UserWithMemberships } from '@ccc-types';
import { Ban, UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

function DeleteMemberModal({
  title,
  className,
  groupId,
  memberId,
  userData,
  ...props
}: {
  title?: string;
  className?: string;
  groupId: number;
  memberId: number;
  userData?: UserWithMemberships;
}) {
  const router = useRouter();
  const api = useRequestFunction(deleteMember);

  const isAdmin = isUserAdminOfGroup(userData, groupId);

  useEffect(() => {
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      toast.success('탈퇴 완료');
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [api.isError, api.isSuccess, api.error, isAdmin, router]);

  const handleDeleteGroup = async () => {
    await api.request(groupId, memberId);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {isAdmin && memberId !== userData?.id ? (
          <Ban className="size-4 cursor-pointer text-text-secondary md:size-6" />
        ) : (
          <UserX className="size-4 cursor-pointer text-text-secondary md:size-6" />
        )}
      </DialogTrigger>
      <DialogContent onClick={handleClick}>
        <WarningIcon />
        <DialogTitle className="mb-[-10px] flex flex-col gap-3 text-center">
          {title && <p>&apos;{title}&apos;</p>}
          {isAdmin && memberId !== userData?.id ? (
            <p>회원을 정말 추방시키겠어요?</p>
          ) : (
            <p>그룹을 정말 탈퇴하시겠어요?</p>
          )}
        </DialogTitle>
        <DialogDescription>탈퇴 후에는 되돌릴 수 없습니다.</DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            {/** NOTE - DELETE 로직 추가 전에 임시로 이벤트 버블링 방지를 위해 함수 할당 */}
            <Button variant="danger" {...props} onClick={handleDeleteGroup}>
              {isAdmin && memberId !== userData?.id ? '추방' : '탈퇴'}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteMemberModal;
