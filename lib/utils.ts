import colors from '@/constants/Color';
import { DateFormatType, UserWithMemberships } from '@ccc-types';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

/**
 * CSS 클래스 이름을 병합하고, 중복된 클래스를 제거합니다.
 * @param {...ClassValue[]} inputs - 클래스 이름 문자열 또는 객체들을 배열로 전달합니다.
 * @returns {string} 병합된 클래스 이름 문자열을 반환합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 주어진 객체가 빈 객체인지 여부를 확인합니다.
 * @param {any} obj - 빈 객체인지 확인할 객체.
 * @returns {boolean} 빈 객체이면 true, 그렇지 않으면 false를 반환합니다.
 */
export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * 주어진 문자열 또는 숫자를 해시값으로 변환하여 색상을 반환합니다.
 * @param {string | number} inp - 해시값으로 변환할 문자열 또는 숫자.
 * @returns {string} 색상 이름을 반환합니다.
 */
export function stringToHex(inp: string | number): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(String(inp));
  let sum = 0;

  for (let i = 0; i < bytes.length; i += 1) {
    sum += bytes[i];
  }

  return colors[sum % colors.length];
}

export const dateFormatter = {
  /**
   * 주어진 날짜를 시간 형식으로 포맷합니다.
   * @param {Date | string} date - 포맷할 날짜.
   * @returns {string} '오전/오후 HH:MM' 형식의 시간 문자열을 반환합니다.
   */
  toTime: (date: Date | string): string => {
    const formattedDate = new Date(date);

    const fullHour = formattedDate.getHours();
    const min = formattedDate.getMinutes().toString().padStart(2, '0');

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
  },

  /**
   * 주어진 날짜를 지정된 포맷으로 변환합니다.
   * @param {Date | string} date - 변환할 날짜.
   * @param {DateFormatType} [type='dotFormat'] - 날짜 포맷 유형 (기본값: 'dotFormat').
   * @returns {string} 지정된 포맷으로 변환된 날짜 문자열을 반환합니다.
   */
  toConvertDate: (
    date: Date | string,
    type: DateFormatType = 'dotFormat'
  ): string => {
    const formattedDate = new Date(date);

    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();

    const dayList = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = dayList[formattedDate.getDay()];

    switch (type) {
      case 'koreanFullDate':
        return `${year}년 ${month}월 ${day}일`;

      case 'monthAndDay':
        return `${month}월 ${day}일 (${weekDay})`;

      default: // case 'dotFormat'
        // type과 기본값이 있으므로 따로 case지정 없이 default로 설정해주었습니다.
        return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
    }
  },

  /**
   * 주어진 날짜와 현재 시간 간의 차이를 계산하여 문자열로 반환합니다.
   * @param {Date | string} date - 비교할 날짜.
   * @returns {string} 현재 시간과의 차이를 'x분 전', 'x시간 전', 'x일 전', 또는 날짜 문자열 형식으로 반환합니다.
   */
  toTimeDifference: (date: Date | string): string => {
    const formattedDate = new Date(date);
    const createdTime = formattedDate.getTime();
    const currentTime = new Date().getTime();

    const agoMin = Math.floor((currentTime - createdTime) / (1000 * 60));
    const agoHour = Math.floor(agoMin / 60);
    const agoDay = Math.floor(agoHour / 24);

    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();

    if (agoMin < 1) {
      return '방금 전';
    }
    if (agoMin < 60) {
      return `${agoMin}분 전`;
    }
    if (agoHour < 24) {
      return `${agoHour}시간 전`;
    }
    if (agoDay < 7) {
      return `${agoDay}일 전`;
    }
    return `${year}. ${month.toString().padStart(2, '0')}. ${day.toString().padStart(2, '0')}`;
  },
};

/**
 * 클립보드에 텍스트를 복사합니다. 복사가 성공하면 성공 메시지를, 실패하면 실패 메시지를 표시합니다.
 *
 * @param {string} text - 클립보드에 복사할 텍스트
 * @param {string} label - 메세지에 표시될 text label
 */
export const copyText = (text: string, label: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(`${label}이(가) 복사되었습니다!`);
    })
    .catch(() => {
      toast.error(`${label} 복사에 실패했습니다!`);
    });
};

/**
 * 사용자가 주어진 그룹의 관리자인지 확인합니다.
 * @param {UserWithMemberships | undefined} userData - 사용자 데이터
 * @param {number | string} groupId - 그룹 ID
 * @returns {boolean} 사용자가 그룹의 관리자이면 true, 아니면 false
 */
export function isUserAdminOfGroup(
  userData: UserWithMemberships | undefined,
  groupId: number | string
): boolean {
  return (
    userData?.memberships.some(
      (membership) =>
        membership.role === 'ADMIN' && +membership.group.id === +groupId
    ) ?? false
  );
  
export const lineBreaker = (content: string) => {
  const lineBreakedContent = content.split('\n');
  return lineBreakedContent;
};
  
// 랜덤 문자열 생성
export function generateRandomState(): string {
  return uuidv4();
}
