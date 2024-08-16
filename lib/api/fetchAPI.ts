import ENDPOINTS from '@/lib/api/ENDPOINTS';
import client from '@/lib/api/client/client';
import {
  Article,
  ArticleDetail,
  CursorBasedPagination,
  DateString,
  DetailTask,
  Group,
  GroupTask,
  History,
  Id,
  OffsetBasedPagination,
  Task,
  UserWithMemberships,
} from '@ccc-types';

async function getUser() {
  const { data, error } = await client<UserWithMemberships>(
    ENDPOINTS.USER.ACTIONS,
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '유저의 정보를 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getUserHistory() {
  const { data, error } = await client<History>(ENDPOINTS.USER.GET_HISTORY, {
    method: 'get',
  });
  if (error) {
    return {
      error: {
        info: '유저의 히스토리를 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getTaskList(groupId: Id, taskListId: Id, date: DateString) {
  const { data, error } = await client<GroupTask>(
    ENDPOINTS.TASKLIST.GROUP_ACTIONS(groupId, taskListId, date),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}를 가져오는 중 에러가 발생했습니다`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

// 특정 일자, 특정 할일 리스트의 할일 리스트
async function getGroupSpecificTasks(groupId: Id) {
  const { data, error } = await client<Task[]>(
    ENDPOINTS.GROUP.GET_GROUP_TASKS(groupId),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    return {
      error: {
        info: '그룹 tasks를 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getTasks(groupId: Id, taskListId: Id, date: DateString) {
  const { data, error } = await client<Task[]>(
    ENDPOINTS.TASK.ACTIONS(groupId, taskListId, date),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    return {
      error: {
        info: `TaskList${taskListId}의 tasks를 가져오는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getTask(taskId: Id) {
  const { data, error } = await client<DetailTask>(
    ENDPOINTS.TASK.ACTIONS_ITEM(taskId),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    return {
      error: {
        info: `Task${taskId}의 task를 가져오는 중 에러가 발생했습니다.`,
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getGroup(groupId: Id) {
  const { data, error } = await client<Group>(
    ENDPOINTS.GROUP.ACTIONS(groupId),
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '그룹 정보를 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getComments(taskId: Id) {
  const { data, error } = await client<Comment[]>(
    ENDPOINTS.COMMENT.ACTIONS(taskId),
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '댓글을 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getArticles() {
  const { data, error } = await client<OffsetBasedPagination<Article>>(
    ENDPOINTS.ARTICLE.ACTIONS,
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글 목록을 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getArticle(articleID: Id) {
  const { data, error } = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(articleID),
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글 정보를 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
}

async function getArticleComments(articleID: Id) {
  const { data, error } = await client<CursorBasedPagination<Comment>>(
    ENDPOINTS.COMMENT.ARTICLE(articleID),
    {
      method: 'get',
    }
  );
  if (error) {
    return {
      error: {
        info: '게시글 댓글 목록을 가져오는 중 에러가 발생했습니다.',
        message: error.message,
        ...error.cause,
      },
    };
  }
  return { data };
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
