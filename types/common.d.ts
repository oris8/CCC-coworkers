declare module '@ccc-types' {
  export type Id = number; // integer($int32), minimum: 1
  export type UrlType = string; // pattern: ^https?://.+
  export type DateString = Date | string; // example: "2021-01-01T00:00:00Z" , ISO 8601 날짜-시간 문자열
  export type DateFormatType = 'dotFormat' | 'koreanFullDate' | 'monthAndDay';

  export type OffsetBasedPagination<T> = {
    totalCount: number; // ($double)
    list: T[];
  };
  export type CursorBasedPagination<T> = {
    nextCursor: number;
    list: T[];
  };
}
