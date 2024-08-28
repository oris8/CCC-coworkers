'use server';

import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import { GroupTask, Id, Recurring, Task } from '@ccc-types';
import { revalidatePath } from 'next/cache';

export async function createTask(
  groupId: Id,
  taskListId: Id,
  data: Partial<
    Pick<
      Recurring,
      | 'name'
      | 'description'
      | 'displayIndex'
      | 'frequencyType'
      | 'monthDay'
      | 'weekDays'
    >
  >
) {
  const res = await client<GroupTask>(
    ENDPOINTS.TASK.RECURRING(groupId, taskListId),
    {
      method: 'post',
      data,
    }
  );

  return handleApiResponse(
    res,
    `TaskList${taskListId}의 tasks를 생성하는 중 중 에러가 발생했습니다.`
  );
}

export async function updateTask(
  taskId: Id,
  data: {
    name?: string;
    description?: string;
    done?: boolean;
  }
) {
  const res = await client<Task>(ENDPOINTS.TASK.ACTIONS_ITEM(taskId), {
    method: 'patch',
    data,
  });

  revalidatePath(`/${taskId}/tasks`);
  return handleApiResponse(
    res,
    `task${taskId}의 tasks를 수정하는 중 에러가 발생했습니다.`
  );
}

export async function deleteTask(taskId: Id) {
  const res = await client<void>(ENDPOINTS.TASK.ACTIONS_ITEM(taskId), {
    method: 'delete',
  });

  return handleApiResponse(
    res,
    `${taskId}번 할일을 삭제하는 중 에러가 발생했습니다.`
  );
}

// 반복할일 삭제
export async function deleteRecurringTask(taskId: Id) {
  const res = await client<void>(
    ENDPOINTS.TASK.DELETE_RECURRING_TASKS(taskId),
    {
      method: 'delete',
    }
  );

  return handleApiResponse(res, `할일을 삭제하는 도중 에러가 발생했습니다.`);
}
