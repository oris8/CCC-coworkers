import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteGroup } from '@/lib/api/group';
import WarningIcon from '@/public/icons/modal/warning_icon.svg';
import { useRouter } from 'next/navigation';
import React from 'react';

function DeleteGroupModal({
  title,
  className,
  groupId,
  ...props
}: {
  title: string;
  className?: string;
  groupId: number;
}) {
  const router = useRouter();

  const handleDeleteGroup = () => {
    deleteGroup(groupId);
    router.push('/');
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <button type="button" onClick={handleClick}>
          삭제하기
        </button>
      </DialogTrigger>
      <DialogContent onClick={handleClick}>
        <WarningIcon />
        <DialogTitle className="mb-[-10px] flex flex-col gap-3 text-center">
          {title && <p>&apos;{title}&apos;</p>}
          <p>그룹을 정말 삭제하시겠어요?</p>
        </DialogTitle>
        <DialogDescription>삭제 후에는 되돌릴 수 없습니다.</DialogDescription>
        <div className="gap- flex w-full max-w-[280px] gap-2">
          <DialogClose asChild>
            <Button variant="outlined-secondary">닫기</Button>
          </DialogClose>
          <DialogClose asChild>
            {/** NOTE - DELETE 로직 추가 전에 임시로 이벤트 버블링 방지를 위해 함수 할당 */}
            <Button variant="danger" {...props} onClick={handleDeleteGroup}>
              삭제
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteGroupModal;
