'use server';

import { ENDPOINTS } from '@/lib/api/API_CONSTANTS';
import client from '@/lib/api/client/server';
import { Group, Id, Member } from '@ccc-types';

export async function createGroup(
  data: Partial<Pick<Group, 'image' | 'name'>>
): Promise<Omit<Group, 'members' | 'taskLists'>> {
  const { data: response, error } = await client<
    Omit<Group, 'members' | 'taskLists'>
  >(ENDPOINTS.GROUP.POST, {
    method: 'post',
    data,
  });
  if (error) {
    throw new Error('그룹 생성 중 에러가 발생했습니다.', { cause: error });
  }
  return response;
}

export async function updateGroup(
  groupId: Id,
  data: Partial<Pick<Group, 'image' | 'name'>>
): Promise<Omit<Group, 'members' | 'taskLists'>> {
  const { data: response, error } = await client<
    Omit<Group, 'members' | 'taskLists'>
  >(ENDPOINTS.GROUP.ACTIONS(groupId), {
    method: 'patch',
    data,
  });
  if (error) {
    throw new Error('그룹 업데이트 중 에러가 발생했습니다.', { cause: error });
  }
  return response;
}

export async function deleteGroup(groupId: Id) {
  const { error } = await client<void>(ENDPOINTS.GROUP.ACTIONS(groupId), {
    method: 'delete',
  });
  if (error) {
    throw new Error('그룹 삭제 중 에러가 발생했습니다.', { cause: error });
  }
  return true;
}

export async function getMember(groupId: Id, memberId: Id): Promise<Member> {
  const { data, error } = await client<Member>(
    ENDPOINTS.GROUP.MEMBER_ACTIONS(groupId, memberId),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('멤버 정보를 가져오는 중 에러가 발생했습니다.', {
      cause: error,
    });
  }
  return data;
}

// 초대 링크없이 그룹에 유저를 추가
export async function createMember(groupId: Id, data: { userId: string }) {
  const { error } = await client<void>(ENDPOINTS.GROUP.MEMBER_POST(groupId), {
    method: 'post',
    data,
  });
  if (error) {
    throw new Error('멤버 정보 생성 중 에러가 발생했습니다.', { cause: error });
  }
  return true;
}

// 초대 링크용 토큰 생성
// 초대 링크에 토큰을 포함시켜서, 초대 링크를 받은 사용자가 접속시, 토큰을 사용해서 초대를 수락하여 스스로를 그룹에 포함시키게 됨.
export async function createTokenForMemberInvitation(
  groupId: Id
): Promise<string> {
  const { data, error } = await client<string>(
    ENDPOINTS.GROUP.GET_GROUP_INVITATION(groupId),
    {
      method: 'get',
    }
  );
  if (error) {
    throw new Error('멤버 초대 토큰 생성 중 에러가 발생했습니다.', {
      cause: error,
    });
  }
  return data;
}

// GET {id}/invitation으로 생성한 토큰으로, 초대를 수락하는 엔드포인트
export async function inviteMemberViaLink(userId: Id, token: string) {
  const { error } = await client<void>(
    ENDPOINTS.GROUP.POST_GROUP_ACCEPT_INVITATION,
    {
      method: 'post',
      data: {
        userId,
        token,
      },
    }
  );
  if (error) {
    throw new Error('초대 수락 중 에러가 발생했습니다.', { cause: error });
  }
  return true;
}
