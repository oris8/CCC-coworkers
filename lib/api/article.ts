'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import { Article, ArticleDetail, Id } from '@ccc-types';
import { revalidatePath } from 'next/cache';

type CreateArticleBody = Pick<Article, 'image' | 'content' | 'title'>;
type UpdateArticleBody = Partial<CreateArticleBody>;

export async function createArticle(data: CreateArticleBody) {
  const res = await client<Article>(ENDPOINTS.ARTICLE.ACTIONS(), {
    method: 'post',
    data,
  });

  if (res.data) {
    revalidatePath('/boards');
  }

  return handleApiResponse(res, '게시글을 생성하는 중 중 에러가 발생했습니다.');
}

export async function updateArticle(articleId: Id, data: UpdateArticleBody) {
  const res = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(`${articleId}`),
    {
      method: 'patch',
      data,
    }
  );

  return handleApiResponse(res, '게시글을 수정하는 중 에러가 발생했습니다.');
}

export async function deleteArticle(articleId: Id) {
  const res = await client<{ id: Id }>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(`${articleId}`),
    {
      method: 'delete',
    }
  );

  if (res.data) {
    revalidatePath('/boards');
  }
  return handleApiResponse(res, '게시글을 삭제하는 중 에러가 발생했습니다.');
}

export async function likeArticle(articleId: Id) {
  const res = await client<ArticleDetail>(ENDPOINTS.ARTICLE.LIKE(articleId), {
    method: 'post',
  });

  if (res.data) {
    revalidatePath(`/boards/${articleId}`);
  }
  return handleApiResponse(
    res,
    '게시글 좋아요를 누르는 중에 오류가 발생했습니다.'
  );
}

export async function unlikeArticle(articleId: Id) {
  const res = await client<ArticleDetail>(ENDPOINTS.ARTICLE.LIKE(articleId), {
    method: 'delete',
  });

  if (res.data) {
    revalidatePath(`/boards/${articleId}`);
  }
  return handleApiResponse(
    res,
    '게시글 좋아요를 취소하는중에 오류가 발생했습니다.'
  );
}
