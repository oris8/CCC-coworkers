declare module '@ccc-types' {
  export type DisplayIndex = number; // integer($int32), minimum: 0

  export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

  export interface Task {
    deletedAt: DateString;
    recurringId: Id;
    frequency: FrequencyType | string;
    userId: Id;
    date: DateString;
    doneAt?: DateString | null; // nullable: true
    description?: string;
    updatedAt: DateString;
    name: string;
    id: Id;
  }

  export interface GroupTask {
    groupId: Id;
    taskListId: Id;
    displayIndex?: number;
    monthDay: number;
    weekDays: number[];
    frequencyType: FrequencyType;
    description?: string;
    updatedAt: DateString;
    createdAt: DateString;
    name: Nickname;
    id: Id;
  }

  // tasks: string[]
}
