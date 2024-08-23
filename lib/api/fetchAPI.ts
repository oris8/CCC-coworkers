import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import { handleApiResponse } from '@/lib/api/utils';
import type * as T from '@ccc-types';

async function getUser() {
  const res = await client<T.UserWithMemberships>(ENDPOINTS.USER.ACTIONS, {
    method: 'get',
  });

  return handleApiResponse(res, '유저 정보를 가져오는 중 에러가 발생했습니다.');
}

async function getUserHistory() {
  const res = await client<T.History>(ENDPOINTS.USER.GET_HISTORY, {
    method: 'get',
  });

  return handleApiResponse(
    res,
    '유저의 히스토리를 가져오는 중 에러가 발생했습니다.'
  );
}

async function getTaskList(
  groupId: T.Id,
  taskListId: T.Id,
  date: T.DateString
) {
  const res = await client<T.GroupTask>(
    ENDPOINTS.TASKLIST.GROUP_ACTIONS(groupId, taskListId, date),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );

  return handleApiResponse(
    res,
    `TaskList${taskListId}를 가져오는 중 에러가 발생했습니다`
  );
}

// 특정 일자, 특정 할일 리스트의 할일 리스트
async function getGroupSpecificTasks(groupId: T.Id) {
  const res = await client<T.Task[]>(ENDPOINTS.GROUP.GET_GROUP_TASKS(groupId), {
    method: 'get',
    // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
  });

  return handleApiResponse(
    res,
    '그룹 tasks를 가져오는 중 에러가 발생했습니다.'
  );
}

async function getTasks(groupId: T.Id, taskListId: T.Id, date: T.DateString) {
  const res = await client<T.Task[]>(
    ENDPOINTS.TASK.ACTIONS(groupId, taskListId, date),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );

  return handleApiResponse(
    res,
    `TaskList${taskListId}의 tasks를 가져오는 중 에러가 발생했습니다.`
  );
}

async function getTask(taskId: T.Id) {
  const res = await client<T.DetailTask>(ENDPOINTS.TASK.ACTIONS_ITEM(taskId), {
    method: 'get',
    // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
  });

  return handleApiResponse(
    res,
    `Task${taskId}의 task를 가져오는 중 에러가 발생했습니다.`
  );
}

async function getGroup(groupId: T.Id) {
  const res = await client<T.Group>(ENDPOINTS.GROUP.ACTIONS(groupId), {
    method: 'get',
  });

  return handleApiResponse(res, '그룹 정보를 가져오는 중 에러가 발생했습니다.');
}

async function getComments(taskId: T.Id) {
  const res = await client<T.Comment[]>(ENDPOINTS.COMMENT.ACTIONS(taskId), {
    method: 'get',
  });

  return handleApiResponse(res, '댓글을 가져오는 중 에러가 발생했습니다.');
}

async function getArticles(params?: string) {
  const res = await client<T.OffsetBasedPagination<T.Article>>(
    ENDPOINTS.ARTICLE.ACTIONS(params),
    {
      method: 'get',
    }
  );

  return handleApiResponse(
    res,
    '게시글 목록을 가져오는 중 에러가 발생했습니다.'
  );
}

async function getArticle(articleID: T.Id) {
  const res = await client<T.ArticleDetail>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(`${articleID}`),
    {
      method: 'get',
    }
  );

  return handleApiResponse(
    res,
    '게시글 정보를 가져오는 중 에러가 발생했습니다.'
  );
}

async function getArticleComments(articleID: T.Id, limit: number) {
  const res = await client<T.CursorBasedPagination<T.ArticleComment>>(
    ENDPOINTS.COMMENT.ARTICLE(articleID, limit),
    {
      method: 'get',
    }
  );

  return handleApiResponse(
    res,
    '게시글 댓글 목록을 가져오는 중 에러가 발생했습니다.'
  );
}

const fetchAPI = {
  User: getUser,
  UserHistory: getUserHistory,
  Group: getGroup,
  GroupSpecificTasks: getGroupSpecificTasks,
  Tasks: getTasks,
  Task: getTask,
  TaskList: getTaskList,
  Comments: getComments,
  Articles: getArticles,
  Article: getArticle,
  ArticleComments: getArticleComments,
};

export default fetchAPI;
