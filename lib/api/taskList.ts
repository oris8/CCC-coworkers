'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { GroupTask, Id } from '@ccc-types';

export async function createTaskList(groupId: Id, data: { name: string }) {
  const { data: response, error } = await client<GroupTask>(
    ENDPOINTS.TASKLIST.POST(groupId),
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: 'TaskList를 생성하는 중 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function updateTaskList(
  groupId: Id,
  taskListId: Id,
  data: { name: string }
) {
  const { data: response, error } = await client<GroupTask>(
    ENDPOINTS.TASKLIST.GROUP_ACTIONS(groupId, taskListId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}를 수정하는 중 에러가 발생했습니다`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function deleteTask(groupId: Id, taskListId: Id) {
  const { error } = await client<void>(
    ENDPOINTS.TASKLIST.GROUP_ACTIONS(groupId, taskListId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}를 삭제하는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}

// 할일 목록의 순서를 변경합니다.
// taskList의 displayIndex를 변경합니다. 해당 taskList가 기존 displayIndex를 버리고 넘어가면서,
// 그 빈 displayIndex는 "한 자리씩 당겨지는 식"으로 변경됩니다. [1,2,3,4] => (3을 0 인덱스로) => [3,1,2,4] => (4를 1 인덱스로) => [3,4,1,2]
export async function reorderTaskList(
  groupId: Id,
  taskListId: Id,
  data: { displayIndex: number }
) {
  const { error } = await client<void>(
    ENDPOINTS.TASKLIST.PATCH_ORDER(groupId, taskListId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 순서를 변경하는 중 에러가 발생했습니다`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}
