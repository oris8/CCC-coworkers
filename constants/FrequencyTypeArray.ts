interface FrequencyTypeArray {
  value: string;
  label: string;
}

const frequencyTypeArray: FrequencyTypeArray[] = [
  { value: 'ONCE', label: '한 번' },
  { value: 'DAILY', label: '매일' },
  { value: 'WEEKLY', label: '주 반복' },
  { value: 'MONTHLY', label: '월 반복' },
];

export default frequencyTypeArray;
