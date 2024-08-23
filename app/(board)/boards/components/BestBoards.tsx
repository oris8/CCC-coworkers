import fetchAPI from '@/lib/api/fetchAPI';

import BestBoardCard from './BestBoardCard';

async function BestBoards() {
  const { data, error } = await fetchAPI.Articles(
    'page=1&pageSize=3&orderBy=like'
  );

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8 xl:mt-10">
      <p className="font-medium md:text-xl md:font-bold">베스트 게시글</p>
      <div className="flex md:gap-4 xl:gap-5">
        <BestBoardCard article={data.list[0]} />
        <BestBoardCard article={data.list[1]} className="hidden md:block" />
        <BestBoardCard article={data.list[2]} className="hidden xl:block" />
      </div>
    </div>
  );
}
export default BestBoards;
