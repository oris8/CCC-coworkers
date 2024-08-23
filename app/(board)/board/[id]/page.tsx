import fetchAPI from '@/lib/api/fetchAPI';
import { notFound } from 'next/navigation';

import BoardCommentInput from './components/BoardCommentInput';
import BoardComments from './components/BoardComments';
import BoardDetailDescription from './components/BoardDetailDescription';

async function BoardDetail({ params }: { params: { id: number } }) {
  const { id } = params;
  const { data, error } = await fetchAPI.Article(id);

  if (error || !data) {
    notFound();
  }

  return (
    <div className="my-10 md:my-14">
      <BoardDetailDescription article={data} />
      <BoardCommentInput />
      <hr className="my-8 md:my-10" />
      <BoardComments articleId={id} />
    </div>
  );
}
export default BoardDetail;
