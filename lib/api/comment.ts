'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { Id } from '@ccc-types';

export async function postComment(taskId: Id, comment: string) {
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
    return {
      error: {
        info: '메세지 생성 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

export async function updateComment(commentId: Id, comment: string) {
  const { error } = await client<void>(ENDPOINTS.COMMENT.ACTIONS(commentId), {
    method: 'patch',
    data: {
      content: comment,
    },
  });
  if (error) {
    return {
      error: {
        info: '메세지 수정 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}

export async function deleteComment(commentId: Id) {
  const { error } = await client<void>(ENDPOINTS.COMMENT.ACTIONS(commentId), {
    method: 'delete',
  });
  if (error) {
    return {
      error: {
        info: '메세지 삭제 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}
