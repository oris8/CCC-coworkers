'use client';

import NextIcon from '@/public/icons/next_down_icon.svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

function GetNextCommentInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNextData = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentLimit = parseInt(params.get('limit') || '0', 10);
    params.set('limit', (currentLimit + 10).toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
    <button
      type="button"
      className="updown mx-auto mt-10"
      onClick={handleNextData}
      aria-label="댓글 개수가 많을 시 추가 로딩 버튼"
    >
      <NextIcon width={20} height={20} />
    </button>
  );
}

export default GetNextCommentInfo;
