import fetchAPI from '@/lib/api/fetchAPI';
import { notFound } from 'next/navigation';

import BoardCard from './BoardCard';
import BoardSortDropdown from './BoardSortDropdown';

async function BoardList({
  searchParams,
}: {
  searchParams: { page: string; keyword?: string; orderBy?: string };
}) {
  const { data, error } = await fetchAPI.Articles(
    `page=${searchParams.page}&pageSize=10${searchParams.keyword ? `&keyword=${searchParams.keyword}` : ''}&${searchParams.orderBy ? `&orderBy=${searchParams.orderBy}` : ''}`
  );
  if (error) {
    notFound();
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-medium md:text-xl md:font-bold">게시글</p>
        <BoardSortDropdown />
      </div>
      <div className="mt-6 flex flex-col gap-y-4 md:mt-8 md:gap-y-6 xl:grid xl:grid-cols-2 xl:gap-6">
        {data?.list.map((article) => (
          <BoardCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
export default BoardList;
