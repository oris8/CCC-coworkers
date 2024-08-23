import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

import BestBoards from './components/BestBoards';
import BoardList from './components/BoardList';
import BoardPagination from './components/BoardPagination';
import SearchBoard from './components/SearchBoard';

async function BoardPage({
  searchParams,
}: {
  searchParams: { page: string; keyword?: string; orderBy?: string };
}) {
  return (
    <>
      <SearchBoard searchParams={searchParams} />
      <BestBoards />
      <hr className="my-8 md:my-10" />
      {/* TODO - 스켈레톤 */}
      <Suspense key={searchParams.page} fallback={<div>Loading...</div>}>
        <BoardList searchParams={searchParams} />
      </Suspense>
      <Suspense key={searchParams.keyword} fallback={<div>Loading...</div>}>
        <BoardPagination searchParams={searchParams} />
      </Suspense>
      <Link href="/addboard">
        <Button
          variant="floating"
          className="fixed bottom-5 right-4 md:right-6 xl:right-[calc((100%-1200px)/2)]"
        >
          + 글쓰기
        </Button>
      </Link>
    </>
  );
}
export default BoardPage;
