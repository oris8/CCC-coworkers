'use client';

import { Input } from '@/components/ui/input';
import SearchIcon from '@/public/icons/search.svg';
import { debounce } from 'es-toolkit';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

function SearchBoard({ searchParams }: { searchParams: { keyword?: string } }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(searchParams.keyword);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const keywordUrl = value
        ? `/boards?page=1&keyword=${value}`
        : '/boards?page=1';

      router.push(keywordUrl);
    }, 300),
    [router]
  );

  return (
    <div className="mt-8 flex flex-col gap-y-6 md:mt-10">
      <p className="text-lg font-bold md:text-2xl">자유 게시판</p>
      <div className="relative">
        <Input
          placeholder="검색어를 입력해주세요"
          className="px-12 md:px-14"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
export default SearchBoard;
