import fetchAPI from '@/lib/api/fetchAPI';
import { notFound } from 'next/navigation';

import BoardCommentInput from './components/BoardCommentInput';
import BoardComments from './components/BoardComments';
import BoardDetailDescription from './components/BoardDetailDescription';

async function BoardDetail({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { limit: number };
}) {
  const { id } = params;

  const [articleRes, userRes] = await Promise.all([
    fetchAPI.Article(id),
    fetchAPI.User(),
  ]);

  if (articleRes.error || userRes.error) {
    notFound();
  }

  return (
    <div className="my-10 md:my-14">
      <BoardDetailDescription
        article={articleRes.data!}
        userId={userRes.data!.id!}
      />
      <BoardCommentInput />
      <hr className="my-8 md:my-10" />
      <BoardComments
        articleId={id}
        userId={userRes.data!.id!}
        limit={searchParams.limit!}
        commentCount={articleRes.data?.commentCount!}
      />
    </div>
  );
}
export default BoardDetail;
