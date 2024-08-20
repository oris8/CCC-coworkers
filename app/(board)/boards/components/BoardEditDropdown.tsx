'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KebabIcon from '@/public/icons/kebab_icon.svg';
import * as React from 'react';

function BoardEditDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="수정 및 삭제 기능 제공 드롭다운"
          className="size-4 outline-none md:size-6"
        >
          <KebabIcon className="size-4 md:size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
        className="relative z-dropdown"
      >
        <DropdownMenuItem
          className="flex w-full flex-col justify-center"
          asChild
        >
          <p>수정하기</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex w-full flex-col justify-center"
          asChild
        >
          <p>삭제하기</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BoardEditDropdown;
