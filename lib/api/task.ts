'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/client';
import { GroupTask, Id, Task } from '@ccc-types';

export async function createTask(
  groupId: Id,
  taskListId: Id,
  data: Partial<
    Pick<
      GroupTask,
      'name' | 'description' | 'displayIndex' | 'frequencyType' | 'monthDay'
    >
  >
) {
  const { data: response, error } = await client<GroupTask>(
    ENDPOINTS.TASK.ACTIONS(groupId, taskListId),
    {
      method: 'post',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 생성하는 중 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function updateTask(
  groupId: Id,
  taskListId: Id,
  taskId: Id,
  data: Pick<Task, 'name' | 'description'> & {
    done: boolean;
    displayIndex?: number;
  }
) {
  const { data: response, error } = await client<Task>(
    ENDPOINTS.TASK.ACTIONS_ITEM(groupId, taskListId, taskId),
    {
      method: 'patch',
      data,
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 수정하는 중 에러가 발생했습니다`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: response };
}

export async function deleteTask(groupId: Id, taskListId: Id, taskId: Id) {
  const { error } = await client<void>(
    ENDPOINTS.TASK.ACTIONS_ITEM(groupId, taskListId, taskId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 삭제하는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}

// 반복할일 삭제
export async function deleteTaskAll(groupId: Id, taskListId: Id, taskId: Id) {
  const { error } = await client<void>(
    ENDPOINTS.TASK.DELETE_ALL_TASKS(groupId, taskListId, taskId),
    {
      method: 'delete',
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 반복 삭제하는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data: true };
}
