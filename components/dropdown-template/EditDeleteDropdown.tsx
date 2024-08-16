import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import * as React from 'react';

import DeleteTodoModal from '../modal-template/DeleteTodoModal';

function EditDeleteDropdown({
  title = '',
  className = 'w-[16px] h-[16px]',
  onClick,
}: {
  title?: string;
  className?: string;
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
        <DropdownMenuItem className="flex cursor-pointer flex-col justify-center">
          수정하기
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

export default EditDeleteDropdown;
