import CalenderNoBtnIcon from '@/public/icons/list/calender_no_btn.svg';
import ClockIcon from '@/public/icons/list/clock_icon.svg';
import DailyIcon from '@/public/icons/list/daily_task_icon.svg';
import { formatToDate, formatToTime } from '@/utils/dateFormat';
import Image from 'next/image';
import React from 'react';

const textClass = `text-xs font-normal text-text-default`;

function CommentMeta() {
  return (
    <div className="text-text-primar4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-[32px]">
            <Image
              src="/images/basic_profile.png"
              alt="기본 프로필 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="text-sm font-medium">안혜나</span>
        </div>
        <span className="text-sm font-normal text-text-secondary">
          {formatToDate(new Date(), 'dotFormat')}
        </span>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <CalenderNoBtnIcon />
          <p className={textClass}>
            {formatToDate(new Date(), 'koreanFullDate')}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon />
          <p className={textClass}>{formatToTime(new Date())}</p>
        </div>
        <div className="flex items-center gap-1">
          <DailyIcon />
          <p className={textClass}>대충 할일</p>
        </div>
      </div>
    </div>
  );
}

export default CommentMeta;
