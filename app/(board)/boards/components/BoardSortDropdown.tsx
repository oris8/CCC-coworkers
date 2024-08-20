'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function BoardSortDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p>드롭다운</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-dropdown w-full">
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          <p>최신순</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
        >
          <p>좋아요 많은순</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default BoardSortDropdown;
