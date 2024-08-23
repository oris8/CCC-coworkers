import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import fetchAPI from '@/lib/api/fetchAPI';

async function BoardPagination({
  searchParams,
}: {
  searchParams: { page: string; keyword?: string; orderBy?: string };
}) {
  const { data, error } = await fetchAPI.Articles(
    `page=${searchParams.page}&pageSize=10${searchParams.keyword ? `&keyword=${searchParams.keyword}` : ''}&${searchParams.orderBy ? `&orderBy=${searchParams.orderBy}` : ''}`
  );

  if (error || !data) {
    return <div>Error</div>;
  }

  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(data.totalCount / 10) || 0;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 3) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    if (currentPage > totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ];
  };

  return (
    <Pagination className="my-8 md:my-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(Math.max(1, currentPage - 1))}
            className={`${
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            } hidden md:mr-4 md:flex`}
          />
        </PaginationItem>
        {getVisiblePages().map((page, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis className="size-2 md:size-4 xl:size-9" />
            ) : (
              <PaginationLink
                href={createPageUrl(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(Math.min(totalPages, currentPage + 1))}
            className={`${
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            } hidden md:ml-4 md:flex`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default BoardPagination;
