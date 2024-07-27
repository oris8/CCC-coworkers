declare module '@ccc-types' {
  export type Email = string;
  export type Nickname = string; // 최소 길이 1, 최대 길이 30
  export type Password = string;

  export enum RoleType { // export type RoleType = 'ADMIN' | 'MEMBER';
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
  }

  export interface User {
    teamId: Id; // 필수 문자열
    image?: UrlType | null; // URL 형식의 문자열, nullable
    updatedAt: DateString; // 필수 ISO 8601 날짜-시간 문자열
    createdAt: DateString; // 필수 ISO 8601 날짜-시간 문자열
    nickname: Nickname; // 필수 문자열, 최소 길이 1, 최대 길이 30
    email: Email; // NOTE
    id: Id; // 필수 32비트 정수, 최소값 1
  }

  export interface UserWithGroups extends User {
    groups: Member[];
  }

  export interface Group {
    updateAt: DateString;
    createdAt: DateString;
    image: UrlType;
    name: Nickname;
    id: Id;
    members: Member[];
    taskLists: GroupTask[];
  }

  export interface Member {
    role: RoleType;
    userImage: DateString;
    userEmail: DateString;
    userName: Nickname;
    groupId: Id;
    userId: Id;
  }
}
