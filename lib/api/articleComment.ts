'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import { ArticleComment, Id } from '@ccc-types';
import { revalidatePath } from 'next/cache';

// eslint-disable-next-line import/prefer-default-export
export async function postArticleComment(articleId: Id, comment: string) {
  const res = await client<ArticleComment>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(`${articleId}/comments`),
    {
      method: 'post',
      data: {
        content: comment,
      },
    }
  );
  if (res.data) {
    revalidatePath(`/board/${articleId}`);
  }

  return handleApiResponse(res, '메세지 생성 중 에러가 발생했습니다.');
}

export async function deleteArticleComment(commentId: Id) {
  const res = await client<ArticleComment>(
    ENDPOINTS.ARTICLE.DETAIL_ACTIONS(commentId),
    {
      method: 'delete',
    }
  );
  return handleApiResponse(res, '댓글 삭제중 에러가 발생했습니다.');
}

export async function updateArticleComment(commentId: Id, comment: string) {
  const res = await client<ArticleComment>(
    ENDPOINTS.ARTICLE.DETAIL_ACTIONS(commentId),
    {
      method: 'patch',
      data: {
        content: comment,
      },
    }
  );
  return handleApiResponse(res, '댓글 수정중 에러가 발생했습니다.');
}
