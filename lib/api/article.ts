'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/client';
import { Article, ArticleDetail, Id } from '@ccc-types';

type CreateArticleBody = Pick<Article, 'image' | 'content' | 'title'>;
type UpdateArticleBody = Partial<CreateArticleBody>;

export async function createArticle(data: CreateArticleBody) {
  const { data: response, error } = await client<Article>(
    ENDPOINTS.ARTICLE.ACTIONS,
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글을 생성하는 중 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function updateArticle(articleId: Id, data: UpdateArticleBody) {
  const { data: response, error } = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(articleId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글을 수정하는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function deleteArticle(articleId: Id) {
  const { data, error } = await client<{ id: Id }>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(articleId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글을 삭제하는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

export async function likeArticle(articleId: Id) {
  const { data, error } = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.LIKE(articleId),
    {
      method: 'post',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글 좋아요 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

export async function unlikeArticle(articleId: Id) {
  const { data, error } = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.LIKE(articleId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글 좋아요 삭제 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}
