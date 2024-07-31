'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import { Id } from '@ccc-types';

export async function postComment(
  taskId: Id,
  comment: string
): Promise<Omit<Comment, 'user'>> {
  const { data, error } = await client<Omit<Comment, 'user'>>(
    ENDPOINTS.COMMENT.ACTIONS(taskId),
    {
      method: 'post',
      data: {
        content: comment,
      },
    }
  );
  if (error) {
    throw new Error('메세지 생성 중 에러가 발생했습니다', { cause: error });
  }
  return data;
}

export async function updateComment(
  commentId: Id,
  comment: string
): Promise<boolean> {
  const { error } = await client<void>(ENDPOINTS.COMMENT.ACTIONS(commentId), {
    method: 'patch',
    data: {
      content: comment,
    },
  });
  if (error) {
    throw new Error('메세지 수정 중 에러가 발생했습니다.', { cause: error });
  }
  return true;
}

export async function deleteComment(commentId: Id): Promise<boolean> {
  const { error } = await client<void>(ENDPOINTS.COMMENT.ACTIONS(commentId), {
    method: 'delete',
  });
  if (error) {
    throw new Error('메세지 삭제 중 에러가 발생했습니다.', { cause: error });
  }
  return true;
}
