import { Button } from '@/components/ui/button';
import Link from 'next/link';

import BestBoards from './components/BestBoards';
import BoardList from './components/BoardList';
import SearchBoard from './components/SearchBoard';

function BoardPage() {
  return (
    <>
      <SearchBoard />
      <BestBoards />
      <hr className="my-8 md:my-10" />
      <BoardList />
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
