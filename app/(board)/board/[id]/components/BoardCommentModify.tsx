'use client';

import { Button } from '@/components/ui/button';
import { updateArticleComment } from '@/lib/api/articleComment';
import { Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

function BoardCommentModify({
  content,
  handleEdit,
  commentId,
}: {
  content: string;
  handleEdit: (value: boolean) => void;
  commentId: Id;
}) {
  const [formData, setFormData] = React.useState<string>(content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await updateArticleComment(commentId, formData);
    if (data) {
      toast.success('댓글 수정에 성공하였습니다.');
    } else {
      toast.error('댓글 수정에 실패하였습니다.');
    }
    handleEdit(false);
    router.refresh();
  };

  return (
    <form
      className="relative h-full w-full bg-transparent"
      onSubmit={handleSubmit}
    >
      <textarea
        className="task-list-scroll h-2/3 w-full resize-none bg-transparent outline-none"
        value={formData}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setFormData(e.target.value)
        }
      />
      <div className="absolute right-0 top-8 ml-auto flex h-full w-fit items-center gap-3">
        <button
          type="button"
          className="text-text-default outline-none"
          onClick={() => handleEdit(false)}
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

export default BoardCommentModify;
