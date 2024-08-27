'use client';

import CommentEditDeleteDropdown from '@/components/dropdown-template/CommentEditDeleteDropdown';
import { deleteComment } from '@/lib/api/comment';
import { dateFormatter, lineBreaker } from '@/lib/utils';
import DefaultProfile from '@/public/icons/default_profile.svg';
import { Comment, DateString, Id, User } from '@ccc-types';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import CommentModify from './CommentModify';

function CommentItem({
  content,
  user,
  createdAt,
  id,
  handleData,
  userId,
}: {
  content: string;
  user: Pick<User, 'id' | 'image' | 'nickname'>;
  createdAt: DateString;
  id: Id;
  handleData: (
    type: 'post' | 'patch' | 'delete',
    value?: Comment,
    id?: Id
  ) => void;
  userId?: Id;
}) {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleEditMode = (value: boolean) => {
    setIsEditing(value);
  };

  const handleDelete = async () => {
    const { error } = await deleteComment(id);
    if (error) {
      console.log(id);
      toast.error('댓글 삭제에 실패하였습니다.');
    } else {
      handleData('delete', undefined, id);
      toast.success('댓글 삭제에 성공하였습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-[16px] border-b py-[16px]">
      {isEditing ? (
        <CommentModify
          handleEditMode={handleEditMode}
          commentId={id}
          content={content}
          handleData={handleData}
        />
      ) : (
        <>
          <div className="flex w-full items-start justify-between">
            <p className="text-sm font-normal text-text-primary">
              {lineBreaker(content).map((contentItem) => (
                <p className="min-h-[20px]">{contentItem}</p>
              ))}
            </p>
            {userId === user.id && (
              <CommentEditDeleteDropdown
                handleEdit={handleEditMode}
                handleDelete={handleDelete}
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.image ? (
                <div className="relative size-[32px] rounded-full md:size-8">
                  <Image
                    src={user.image}
                    alt="유저 프로필 이미지"
                    fill
                    className="rounded-full"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <DefaultProfile className="size-[32px]" />
              )}
              <span className="text-sm font-medium">{user.nickname}</span>
            </div>
            <span className="mr-1 text-sm font-medium text-text-default">
              {dateFormatter.toTimeDifference(createdAt)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentItem;
