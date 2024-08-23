'use client';

import { Button } from '@/components/ui/button';
import { updateComment } from '@/lib/api/comment';
import { Comment, Id } from '@ccc-types';
import React, { ChangeEvent } from 'react';
import { toast } from 'sonner';

function CommentModify({
  handleEditMode,
  commentId,
  content,
  handleData,
}: {
  handleEditMode: (value: boolean) => void;
  commentId: Id;
  content: string;
  handleData: (
    type: 'post' | 'patch' | 'delete',
    value: Comment,
    id?: Id
  ) => void;
}) {
  const [formData, setFormData] = React.useState<string>(content);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  const cancelEditMode = () => {
    handleEditMode(false);
    if (textareaRef.current) {
      textareaRef.current.value = content;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      const res = await updateComment(commentId, formData);
      if (res.data) {
        handleData('patch', res.data, commentId);
        toast.success('댓글 수정에 성공하였습니다.');
      } else {
        toast.error('댓글 수정에 실패하였습니다.');
      }
      handleEditMode(false);
    }
  };

  return (
    <form className="h-full w-full bg-transparent" onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        className="h-full w-full resize-none bg-transparent outline-none"
        ref={textareaRef}
        defaultValue={content}
      />
      <div className="ml-auto flex h-full w-fit items-center gap-3 pr-2">
        <button
          type="button"
          onClick={cancelEditMode}
          className="text-text-default outline-none"
        >
          취소
        </button>
        <Button
          type="submit"
          variant="outlined"
          size="x-small"
          className="outline-none"
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}

export default CommentModify;
