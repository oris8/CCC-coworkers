'use client';

import { dateFormatter } from '@/lib/utils';
import LeftButtonIcon from '@/public/icons/list/left_button_icon.svg';
import RightButtonIcon from '@/public/icons/list/right_button_icon.svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import DatePicker from './DatePicker';

function TaskDateController() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const oneDay = 24 * 60 * 60 * 1000;
  const [currentDate, setCurrentDate] = useState<string | null>(
    new URLSearchParams(params).get('date')
  );

  const isToday = new Date().getDate() === new Date(currentDate!).getDate();

  const handleDateChange = (newDate: Date) => {
    const newParams = new URLSearchParams(params);
    newDate.setHours(15, 0, 0, 0);
    newParams.set('date', newDate.toISOString());
    setCurrentDate(newDate.toISOString());
    replace(`${pathname}?${newParams}`);
  };

  return (
    <>
      <span className="w-[100px] text-[16px] font-medium text-text-primary">
        {currentDate
          ? dateFormatter.toConvertDate(currentDate, 'monthAndDay')
          : '날짜를 불러올 수 없습니다. '}
      </span>
      <div className="relative top-[1px] mr-4 flex gap-2">
        <button
          type="button"
          aria-label="날짜 변경 버튼(왼쪽)"
          className="disabled:opacity-70"
          disabled={isToday}
          onClick={() => {
            if (currentDate) {
              handleDateChange(
                new Date(new Date(currentDate).getTime() - oneDay)
              );
            }
          }}
        >
          <LeftButtonIcon />
        </button>
        <button
          type="button"
          aria-label="날짜 변경 버튼(오른쪽)"
          onClick={() => {
            if (currentDate) {
              handleDateChange(
                new Date(new Date(currentDate).getTime() + oneDay)
              );
            }
          }}
        >
          <RightButtonIcon />
        </button>
      </div>
      <DatePicker
        onClick={(day) => {
          if (day) {
            handleDateChange(day);
          }
        }}
      />
    </>
  );
}

export default TaskDateController;
