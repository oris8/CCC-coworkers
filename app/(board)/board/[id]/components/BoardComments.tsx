import fetchAPI from '@/lib/api/fetchAPI';

import BoardComment from './BoardComment';

async function BoardComments({ articleId }: { articleId: number }) {
  const { data, error } = await fetchAPI.ArticleComments(articleId, 10);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.list.map((comment) => (
        <BoardComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
export default BoardComments;
