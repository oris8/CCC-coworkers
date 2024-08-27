'use client';

import { Button } from '@/components/ui/button';
import useRequestFunction from '@/hooks/useRequestFunction';
import { postArticleComment } from '@/lib/api/articleComment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function BoardCommentInput() {
  const [comment, setComment] = useState('');
  const params = useParams();

  const articleId = +params.id;

  const api = useRequestFunction(postArticleComment);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.request(articleId, comment);
    setComment('');
  };

  useEffect(() => {
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
      api.reset();
    }
    if (api.isSuccess) {
      toast.success('댓글 등록에 성공하였습니다!');
      api.reset();
    }
  }, [api, api.isError, api.isSuccess, api.error?.info, api.error?.message]);

  return (
    <div className="mt-20 flex flex-col gap-4">
      <p className="font-medium md:text-xl md:font-bold">댓글 달기</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="min-h-[104px] w-full resize-none rounded-xl border bg-background-secondary px-4 py-2 md:px-6 md:py-4"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          className="ml-auto h-[32px] w-[74px] text-sm md:h-12 md:w-[184px] md:text-base"
          disabled={!comment}
        >
          등록
        </Button>
      </form>
    </div>
  );
}
export default BoardCommentInput;
