import { DateFormatType } from '@ccc-types';

export default function formatToDate(
  date: Date | string,
  type: DateFormatType = 'dotFormat'
): string {
  const formatedDate = new Date(date);

  const year = formatedDate.getFullYear();
  const month = formatedDate.getMonth() + 1;
  const day = formatedDate.getDate();

  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = dayList[formatedDate.getDay()];

  switch (type) {
    case 'dotFormat':
      return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;

    case 'koreanFullDate':
      return `${year}년 ${month}월 ${day}일`;

    case 'monthAndDay':
      return `${month}월 ${day}일 (${weekDay})`;

    default:
      return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
  }
}
