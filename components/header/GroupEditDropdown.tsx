import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import Link from 'next/link';
import * as React from 'react';

import DeleteTodoModal from '../modal-template/DeleteTodoModal';

function GroupEditDropdown({
  title = '',
  className = 'w-[16px] h-[16px]',
  groupId,
  onClick,
}: {
  title?: string;
  className?: string;
  groupId: number;
  onClick: () => void;
}) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="outline-none"
        >
          <KebabIcon className={`${className} hover:fill-text-tertiary`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem
          className="flex cursor-pointer flex-col justify-center"
          asChild
        >
          {/* TODO - 팀 수정 페이지 구현 시 연결 */}
          <Link href={`/${groupId}/edit`}>수정하기</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col justify-center">
          <DeleteTodoModal
            title={title}
            className="w-full cursor-pointer"
            onClick={onClick}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GroupEditDropdown;
