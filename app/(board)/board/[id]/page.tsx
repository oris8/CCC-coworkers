import BoardCommentInput from './components/BoardCommentInput';
import BoardComments from './components/BoardComments';
import BoardDetailDescription from './components/BoardDetailDescription';

function BoardDetail() {
  return (
    <div className="my-10 md:my-14">
      <BoardDetailDescription />
      <BoardCommentInput />
      <hr className="my-8 md:my-10" />
      <BoardComments />
    </div>
  );
}
export default BoardDetail;
