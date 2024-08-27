'use client';

import CommentEditDeleteDropdown from '@/components/dropdown-template/CommentEditDeleteDropdown';
import { deleteArticleComment } from '@/lib/api/articleComment';
import { dateFormatter } from '@/lib/utils';
import ProfileIcon from '@/public/icons/default_profile.svg';
import { ArticleComment, Id } from '@ccc-types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import BoardCommentModify from './BoardCommentModify';

function BoardComment({
  comment,
  userId,
}: {
  comment: ArticleComment;
  userId: Id;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleDeleteComment = async () => {
    const { data } = await deleteArticleComment(comment.id);
    if (data) {
      toast.success('댓글 삭제에 성공하였습니다.');
      router.refresh();
    } else {
      toast.error('댓글 삭제에 실패하였습니다.');
    }
  };

  const handleEdit = (value: boolean) => {
    setIsEditing(value);
  };

  return (
    <div className="flex h-[113px] flex-col justify-between rounded-lg bg-background-secondary p-4 md:h-[123px] md:px-6 md:py-5">
      {isEditing ? (
        <BoardCommentModify
          content={comment.content}
          handleEdit={handleEdit}
          commentId={comment.id}
        />
      ) : (
        <>
          <div className="flex justify-between">
            <p className="text-sm text-text-primary md:text-base">
              {comment.content}
            </p>
            {comment.writer.id === userId && (
              <CommentEditDeleteDropdown
                handleDelete={handleDeleteComment}
                handleEdit={handleEdit}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <ProfileIcon className="size-8" />
              <p className="text-xs font-medium text-text-primary md:text-sm">
                {comment.writer.nickname}
              </p>
              <div className="h-3 border-r border-slate-700" />
              <p className="text-xs font-medium text-slate-400 md:text-sm">
                {dateFormatter.toConvertDate(comment.createdAt)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default BoardComment;
