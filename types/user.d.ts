declare module '@ccc-types' {
  export type Email = string;
  export type Nickname = string; // 최소 길이 1, 최대 길이 30
  export type Password = string;
  export type RoleType = 'ADMIN' | 'MEMBER';

  export interface User {
    teamId: string;
    image?: UrlType | null;
    updatedAt: DateString;
    createdAt: DateString;
    nickname: Nickname;
    email: Email;
    id: Id;
  }

  export interface UserWithGroups extends User {
    groups: Member[];
  }

  export interface Group {
    updatedAt: DateString;
    createdAt: DateString;
    image: UrlType;
    name: Nickname;
    teamId: string;
    id: Id;
    members: Member[];
    taskLists: GroupTask[];
  }

  export interface Groups {
    id: Id;
    teamId: Id;
    name: Nickname;
    image?: UrlType | null;
    updatedAt: DateString;
    createdAt: DateString;
  }

  export type GroupList = Groups[];

  export interface Member {
    role: RoleType;
    userImage: UrlType;
    userEmail: Email;
    userName: Nickname;
    groupId: Id;
    userId: Id;
  }

  export interface UserWithMemberships extends User {
    memberships: Membership[];
  }

  export interface Membership extends Member {
    group: Omit<Group, 'members' | 'taskLists'>;
  }
}
