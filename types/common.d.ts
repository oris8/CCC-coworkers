declare module '@ccc-types' {
  export type Id = number; // integer($int32), minimum: 1
  export type UrlType = string;
  export type DateString = string; // example: "2021-01-01T00:00:00Z"
  export type DateFormatType = 'dotFormat' | 'koreanFullDate' | 'monthAndDay';
}
