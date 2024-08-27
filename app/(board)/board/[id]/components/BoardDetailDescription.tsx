'use client';

import ArticleEditDeleteDropdown from '@/components/dropdown-template/ArticleEditDeleteDropdown';
import ImageModal from '@/components/modal-template/ImageModal';
import { deleteArticle, likeArticle, unlikeArticle } from '@/lib/api/article';
import { dateFormatter } from '@/lib/utils';
import CommentIcon from '@/public/icons/comment.svg';
import ProfileIcon from '@/public/icons/default_profile.svg';
import HeartIcon from '@/public/icons/heart.svg';
import { ArticleDetail, Id } from '@ccc-types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

function BoardDetailDescription({
  article,
  userId,
}: {
  article: ArticleDetail;
  userId: Id;
}) {
  const router = useRouter();

  const handleLikeArticle = async () => {
    if (!article.isLiked) {
      const res = await likeArticle(article.id);
      if (res.data) {
        toast.success('게시물에 좋아요를 표시했습니다.');
      } else {
        toast.error(`${res.error.info}`);
      }
    } else {
      const res = await unlikeArticle(article.id);
      if (res.data) {
        toast.success('게시물에 좋아요 표시를 해제했습니다.');
      } else {
        toast.error(`${res.error.info}`);
      }
    }
  };

  const handleDeleteArticle = async () => {
    const { data } = await deleteArticle(article.id);
    if (data) {
      toast.success('게시물 삭제에 성공하였습니다.');
      router.push('/boards?page=1&orderBy=recent');
    } else {
      toast.success('게시물 삭제에 실패하였습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-6 text-text-secondary">
      <div>
        <div className="mb-4 mt-6 flex justify-between">
          <p className="font-medium md:text-lg">{article.title}</p>
          {article.writer.id === userId && (
            <ArticleEditDeleteDropdown
              className="h-[24px] w-[24px]"
              handleDelete={handleDeleteArticle}
              article={article}
            />
          )}
        </div>
        <hr />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileIcon className="size-8" />
            <p className="text-xs font-medium text-text-primary md:text-sm">
              {article.writer.nickname}
            </p>
            <div className="h-3 border-r border-slate-700" />
            <p className="text-xs font-medium text-slate-400 md:text-sm">
              {dateFormatter.toConvertDate(article.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs md:gap-4 md:text-sm">
            <div className="flex items-center gap-1">
              <CommentIcon className="size-4" />
              <p className="text-slate-400">{article.commentCount}</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 bg-transparent outline-none"
              onClick={handleLikeArticle}
            >
              <HeartIcon
                className={
                  article.isLiked
                    ? 'size-4 fill-red-500 stroke-red-500'
                    : 'size-4'
                }
              />
              <p className="text-slate-400">{article.likeCount}</p>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5">
        <p className="text-sm md:text-base">{article.content}</p>
        {article.image && (
          <ImageModal image={article.image}>
            <div className="relative size-[300px] cursor-pointer">
              <Image
                src={article.image}
                alt="게시글 이미지"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ImageModal>
        )}
      </div>
    </div>
  );
}
export default BoardDetailDescription;
