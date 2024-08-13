import SubmitIcon from '@/public/icons/list/comment_submit_icon.svg';
import React from 'react';

function CommentForm() {
  const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // NOTE - 만들어주신 form을 사용하기엔 따로 에러메세지가 출력되지도 않고 그냥 글자가 있고 없고에 따라 버튼만 막아주면 될 듯하여 따로 사용하진 않았습니다!

  const handleChange = () => {
    const inputNode = inputRef.current;
    if (inputNode) {
      if (inputNode.value.length === 0) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        ref={inputRef}
        onChange={handleChange}
      />
      <button
        type="submit"
        aria-label="댓글 전송하기 버튼"
        className="absolute right-0 z-10"
        disabled={isButtonDisabled}
      >
        <SubmitIcon
          className={`${isButtonDisabled ? 'text-text-default' : 'text-brand-primary'}`}
        />
      </button>
    </form>
  );
}

export default CommentForm;
