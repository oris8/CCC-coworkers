'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DownArrowIcon from '@/public/icons/select/select_arrow_icon.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function BoardSortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('orderBy') || 'recent');

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('orderBy', sort);
    router.push(`?${newSearchParams.toString()}`);
  }, [sort, router, searchParams]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-10 w-[94px] items-center justify-between rounded-lg bg-background-secondary p-2 md:h-11 md:w-[120px] md:px-[14px] md:py-[10px]">
          <p className="text-xs md:text-sm">
            {sort === 'recent' ? '최신순' : '좋아요순'}
          </p>
          <DownArrowIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-dropdown w-full">
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
          onClick={() => setSort('recent')}
        >
          <p>최신순</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex w-full cursor-pointer justify-center py-[14px]"
          onClick={() => setSort('like')}
        >
          <p>좋아요 많은순</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default BoardSortDropdown;
