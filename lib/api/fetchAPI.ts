import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import {
  Article,
  ArticleDetail,
  CursorBasedPagination,
  Group,
  GroupTask,
  Id,
  OffsetBasedPagination,
  Task,
  User,
} from '@ccc-types';

async function getUser(): Promise<User> {
  const { data, error } = await client<User>(ENDPOINTS.USER.ACTIONS, {
    method: 'get',
  });
  if (error) {
    throw new Error('유저의 정보를 가져오는 중 에러가 발생했습니다.', {
      cause: error,
    });
  }
  return data;
}

async function getUserHistory(): Promise<{ taskDone: Task[] }> {
  const { data, error } = await client<{ taskDone: Task[] }>(
    ENDPOINTS.USER.GET_HISTORY,
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('유저의 히스토리를 가져오는 중 에러가 발생했습니다.', {
      cause: error,
    });
  }
  return data;
}

async function getTaskList(groupId: Id, taskListId: Id): Promise<GroupTask[]> {
  const { data, error } = await client<GroupTask[]>(
    ENDPOINTS.TASKLIST.GROUP_ACTIONS(groupId, taskListId),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    throw new Error(`TaskList${taskListId}를 가져오는 중 에러가 발생했습니다`, {
      cause: error,
    });
  }
  return data;
}

// 특정 일자, 특정 할일 리스트의 할일 리스트
async function getGroupSpecificTasks(groupId: Id): Promise<Task[]> {
  const { data, error } = await client<Task[]>(
    ENDPOINTS.GROUP.GET_GROUP_TASKS(groupId),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    throw new Error('그룹 tasks를 가져오는 중 에러가 발생했습니다', {
      cause: error,
    });
  }
  return data;
}

async function getTask(groupId: Id, taskListId: Id): Promise<Task[]> {
  const { data, error } = await client<Task[]>(
    ENDPOINTS.TASK.ACTIONS(groupId, taskListId),
    {
      method: 'get',
      // NOTE 쿼리로 date를 받음, 사용하실때 수정해서 사용해주세요!
    }
  );
  if (error) {
    throw new Error(
      `TaskList${taskListId}의 tasks를 가져오는 중 에러가 발생했습니다`,
      {
        cause: error,
      }
    );
  }
  return data;
}

async function getGroup(groupId: Id): Promise<Group> {
  const { data, error } = await client<Group>(
    ENDPOINTS.GROUP.ACTIONS(groupId),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('그룹 정보를 가져오는 중 에러가 발생했습니다', {
      cause: error,
    });
  }
  return data;
}

async function getComments(taskId: Id): Promise<Comment[]> {
  const { data, error } = await client<Comment[]>(
    ENDPOINTS.COMMENT.ACTIONS(taskId),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('댓글을 가져오는데 실패했습니다', {
      cause: error,
    });
  }
  return data;
}

async function getArticles(): Promise<OffsetBasedPagination<Article>> {
  const { data, error } = await client<OffsetBasedPagination<Article>>(
    ENDPOINTS.ARTICLE.ACTIONS,
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('게시글 목록을 가져오는데 실패했습니다', {
      cause: error,
    });
  }
  return data;
}

async function getArticle(articleID: Id): Promise<ArticleDetail> {
  const { data, error } = await client<ArticleDetail>(
    ENDPOINTS.ARTICLE.ACTIONS_ITEM(articleID),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('게시글 정보를 가져오는데 실패했습니다', {
      cause: error,
    });
  }
  return data;
}

async function getArticleComments(
  articleID: Id
): Promise<CursorBasedPagination<Comment>> {
  const { data, error } = await client<CursorBasedPagination<Comment>>(
    ENDPOINTS.COMMENT.ARTICLE(articleID),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('게시글 댓글 목록을 가져오는데 실패했습니다', {
      cause: error,
    });
  }
  return data;
}

const fetchAPI = {
  User: getUser,
  UserHistory: getUserHistory,
  Group: getGroup,
  GroupSpecificTasks: getGroupSpecificTasks,
  Task: getTask,
  TaskList: getTaskList,
  Comments: getComments,
  Articles: getArticles,
  Article: getArticle,
  ArticleComments: getArticleComments,
};

export default fetchAPI;
