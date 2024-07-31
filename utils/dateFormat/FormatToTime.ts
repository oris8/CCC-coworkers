export default function formatToTime(date: Date | string) {
  const formatedDate = new Date(date);

  const fullHour = formatedDate.getHours();
  const min = formatedDate.getMinutes().toString().padStart(2, '0');

  let period;
  let halfHour;

  if (fullHour >= 12) {
    period = '오후';
  } else period = '오전';

  if (fullHour === 0) {
    halfHour = 12;
  } else if (fullHour > 12) {
    halfHour = fullHour - 12;
  } else if (fullHour <= 12) {
    halfHour = 12 - fullHour;
  }

  return `${period} ${halfHour}:${min}`;
}
