'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import { Comment, Id } from '@ccc-types';

export async function postComment(taskId: Id, comment: string) {
  const res = await client<Comment>(ENDPOINTS.COMMENT.ACTIONS(taskId), {
    method: 'post',
    data: {
      content: comment,
    },
  });

  return handleApiResponse(res, '메세지 생성 중 에러가 발생했습니다.');
}

export async function updateComment(commentId: Id, comment: string) {
  const res = await client<Comment>(
    ENDPOINTS.COMMENT.DETAIL_ACTION(commentId),
    {
      method: 'patch',
      data: {
        content: comment,
      },
    }
  );

  return handleApiResponse(res, '메세지 수정 중 에러가 발생했습니다.');
}

export async function deleteComment(commentId: Id) {
  const res = await client<void>(ENDPOINTS.COMMENT.DETAIL_ACTION(commentId), {
    method: 'delete',
  });

  return handleApiResponse(res, '메세지 삭제 중 에러가 발생했습니다.');
}
