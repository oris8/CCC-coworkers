import BoardCommentInput from '../../_components/BoardCommentInput';
import BoardComments from '../../_components/BoardComments';
import BoardDetailDescription from '../../_components/BoardDetailDescription';

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
