import { postComment } from '@/lib/api/comment';
import SubmitIcon from '@/public/icons/list/comment_submit_icon.svg';
import Spinner from '@/public/icons/spinner_icon.svg';
import { Comment, Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { toast } from 'sonner';

function CommentForm({
  id,
  handleData,
}: {
  id?: Id;
  handleData: (type: 'post' | 'patch' | 'delete', value: Comment) => void;
}) {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const [commentData, setCommentData] = React.useState<string>('');
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  // NOTE - 만들어주신 form을 사용하기엔 따로 에러메세지가 출력되지도 않고 그냥 글자가 있고 없고에 따라 버튼만 막아주면 될 듯하여 따로 사용하진 않았습니다!

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault(); // 줄바꿈 방지
        const buttonNode = buttonRef.current;
        if (buttonNode) {
          buttonNode.click();
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentData(value);
    setIsButtonDisabled(value.length === 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (id) {
      const res = await postComment(id, commentData);
      if (res.error || !res.data) {
        toast.error(`댓글 등록에 실패하였습니다.`);
      } else {
        toast.success(`댓글 등록에 성공하였습니다.`);
        handleData('post', res.data);
        router.refresh();
        setCommentData('');
        setIsButtonDisabled(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <form
      action="#"
      className="relative flex h-[50px] w-full items-center justify-between border-y"
      onSubmit={handleSubmit}
    >
      <textarea
        className="text max-h-full w-full resize-none bg-transparent pt-3 text-text-default outline-none"
        placeholder="댓글을 달아주세요"
        value={commentData}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        ref={buttonRef}
        aria-label="댓글 전송하기 버튼"
        className={`absolute right-0 z-10 ${isLoading && 'flex size-[24px] items-center justify-center rounded-full border bg-brand-primary'}`}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? (
          <Spinner className="rolling" width={16} height={16} />
        ) : (
          <SubmitIcon
            className={`${isButtonDisabled ? 'text-text-default' : 'text-brand-primary'}`}
          />
        )}
      </button>
    </form>
  );
}

export default CommentForm;
