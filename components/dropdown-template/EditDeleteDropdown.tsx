import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BasicEditIcon from '@/public/icons/basic_edit_icon.svg';
import HamburgerIcon from '@/public/icons/user-history/hamburger_icon.svg';
import * as React from 'react';

import DeleteTodoModal from '../modal-template/DeleteTodoModal';

function EditDeleteDropdown({
  title = '',
  className = 'w-[16px] h-[16px]',
  buttonType = 'hamburger',
}: {
  title?: string;
  className?: string;
  buttonType?: 'hamburger' | 'basic';
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="outline-none"
        >
          {buttonType === 'hamburger' ? (
            <HamburgerIcon
              className={`${className} hover:fill-text-tertiary`}
            />
          ) : (
            <BasicEditIcon />
          )}
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
        <DropdownMenuItem className="flex flex-col justify-center" asChild>
          <DeleteTodoModal title={title} className="w-full cursor-pointer" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditDeleteDropdown;
