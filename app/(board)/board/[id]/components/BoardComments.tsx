import fetchAPI from '@/lib/api/fetchAPI';
import { Id } from '@ccc-types';

import BoardComment from './BoardComment';
import GetNextCommentInfo from './GetNextCommentInfo';

async function BoardComments({
  articleId,
  userId,
  limit,
  commentCount,
}: {
  articleId: number;
  userId: Id;
  limit: number;
  commentCount: number;
}) {
  const { data } = await fetchAPI.ArticleComments(articleId, limit);

  return (
    <div className="flex flex-col gap-4">
      {data?.list.map((comment) => (
        <BoardComment key={comment.id} comment={comment} userId={userId} />
      ))}
      {data?.nextCursor && data.list.length !== commentCount && (
        <GetNextCommentInfo />
      )}
    </div>
  );
}
export default BoardComments;
