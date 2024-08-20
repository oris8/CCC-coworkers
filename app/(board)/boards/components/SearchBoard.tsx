import { Input } from '@/components/ui/input';
import SearchIcon from '@/public/icons/search.svg';

function SearchBoard() {
  return (
    <div className="mt-8 flex flex-col gap-y-6 md:mt-10">
      <p className="text-lg font-bold md:text-2xl">자유 게시판</p>
      <div className="relative">
        <Input placeholder="검색어를 입력해주세요" className="px-12 md:px-14" />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
export default SearchBoard;
