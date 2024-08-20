import BoardCard from './BoardCard';
import BoardSortDropdown from './BoardSortDropdown';

function BoardList() {
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-medium md:text-xl md:font-bold">게시글</p>
        <BoardSortDropdown />
      </div>
      <div className="mt-6 flex flex-col gap-y-4 md:mt-8 md:gap-y-6 xl:grid xl:grid-cols-2 xl:gap-6">
        <BoardCard />
        <BoardCard />
        <BoardCard />
      </div>
    </div>
  );
}
export default BoardList;
