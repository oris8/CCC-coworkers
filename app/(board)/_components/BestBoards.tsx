import BestBoardCard from './BestBoardCard';

function BestBoards() {
  return (
    <div className="mt-14 flex flex-col gap-6 md:gap-8">
      {/* TODO - 더보기...있어야할까요..? */}
      <p className="font-medium">베스트 게시글</p>
      <div className="flex md:gap-4 xl:gap-5">
        <BestBoardCard />
        <BestBoardCard className="hidden md:block" />
        <BestBoardCard className="hidden xl:block" />
      </div>
    </div>
  );
}
export default BestBoards;
