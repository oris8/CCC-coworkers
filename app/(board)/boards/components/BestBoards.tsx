import BestBoardCard from './BestBoardCard';

function BestBoards() {
  return (
    <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-8 xl:mt-10">
      <p className="font-medium md:text-xl md:font-bold">베스트 게시글</p>
      <div className="flex md:gap-4 xl:gap-5">
        <BestBoardCard />
        <BestBoardCard className="hidden md:block" />
        <BestBoardCard className="hidden xl:block" />
      </div>
    </div>
  );
}
export default BestBoards;
