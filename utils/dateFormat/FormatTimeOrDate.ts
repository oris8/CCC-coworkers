export default function formatTimeOrDate(date: Date | string): string {
  const formatedDate = new Date(date);
  const writedTime = formatedDate.getTime();
  const currentTime = new Date().getTime();

  const agoMin = Math.floor((currentTime - writedTime) / (1000 * 60));
  const agoHour = Math.floor(agoMin / 60);
  const agoDay = Math.floor(agoHour / 24);

  const year = formatedDate.getFullYear();
  const month = formatedDate.getMonth() + 1;
  const day = formatedDate.getDate();

  if (agoMin < 60) {
    return `${agoMin}분 전`;
  } else if (agoHour < 24) {
    return `${agoHour}시간 전`;
  } else if (agoDay < 7) {
    return `${agoDay}일 전`;
  } else {
    return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
  }
}
