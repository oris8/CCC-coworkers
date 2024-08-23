'use server';

import { ArticleComment, Id } from '@ccc-types';
import { revalidatePath } from 'next/cache';

import ENDPOINTS from './ENDPOINTS';
import client from './client/client';

// eslint-disable-next-line import/prefer-default-export
export async function postArticleComment(articleId: Id, comment: string) {
  const { data: response, error } = await client<ArticleComment>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(`${articleId}/comments`),
    {
      method: 'post',
      data: {
        content: comment,
      },
    }
  );
  if (error) {
    return {
      error: {
        info: '메세지 생성 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  revalidatePath(`/board/${articleId}`);
  return { data: response };
}
