declare module '@ccc-types' {
  export type DisplayIndex = number; // integer($int32), minimum: 0

  export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

  export interface Task {
    deletedAt: DateString;
    recurringId: Id;
    frequency: FrequencyType;
    userId: Id;
    date: DateString;
    doneAt?: DateString | null; // nullable: true
    description?: string;
    updatedAt: DateString;
    name: string;
    id: Id;
  }

  export interface History {
    tasksDone: Task[];
  }

  export interface GroupTask {
    groupId: Id;
    displayIndex: number;
    updatedAt: DateString;
    createdAt: DateString;
    name: Nickname;
    id: Id;
    tasks: Task[];
  }

  export interface Comment {
    user: Pick<User, 'image' | 'nickname' | 'id'>;
    userId: number;
    taskId: number;
    updatedAt: DateString;
    createdAt: DateString;
    content: string;
    id: number;
  }

  export interface Recurring {
    writerId: number;
    groupId: number;
    taskListId: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: FrequencyType;
    displayIndex: number;
    updatedAt: DateString;
    createdAt: DateString;
    description: string;
    name: string;
    id: number;
  }

  interface DoneBy {
    user: Pick<User, 'image' | 'nickname' | 'id'>;
  }

  export interface DetailTask extends Task {
    comments: Comment[];
    recurring: Recurring;
    user: Pick<User, 'image' | 'nickname' | 'id'>;
    doneBy: DoneBy;
  }

  // tasks: string[]
}
