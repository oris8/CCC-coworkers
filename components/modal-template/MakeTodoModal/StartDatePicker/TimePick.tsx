import { TIME_ARRAY } from '@/constants/DateArray';
import React from 'react';

function TimePick({
  period,
  time,
  handlePeriodChange,
  handleTimeChange,
}: {
  period: 'AM' | 'PM';
  time: string;
  handlePeriodChange: (periodValue: 'AM' | 'PM') => void;
  handleTimeChange: (timeValue: string) => void;
}) {
  return (
    <div className="flex gap-3 rounded-xl border-2 border-brand-primary p-3">
      <div className="flex w-[78px] flex-col gap-2">
        <button
          type="button"
          className={`h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default ${period === 'AM' && 'bg-brand-primary text-customBackground-primary'}`}
          onClick={() => handlePeriodChange('AM')}
        >
          오전
        </button>
        <button
          type="button"
          className={`h-[40px] w-[78px] rounded-xl bg-[#18212F] text-text-default ${period === 'PM' && 'bg-brand-primary text-customBackground-primary'}`}
          onClick={() => handlePeriodChange('PM')}
        >
          오후
        </button>
      </div>
      <div className="custom-scroll flex h-[152px] w-full flex-col gap-3 overflow-scroll overflow-x-hidden rounded-xl bg-[#18212F] py-3">
        {TIME_ARRAY.map((timeOption) => (
          <button
            key={timeOption}
            type="button"
            className={`w-full pl-5 text-start text-text-default ${timeOption === time && 'text-text-primary'}`}
            onClick={() => handleTimeChange(timeOption)}
          >
            {timeOption}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimePick;
