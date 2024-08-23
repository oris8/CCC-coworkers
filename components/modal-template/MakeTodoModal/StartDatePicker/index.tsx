import { Input } from '@/components/ui/input';
import { dateFormatter } from '@/lib/utils';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import DatePick from './DatePick';

interface StartDatePickerProps {
  field: ControllerRenderProps<any, 'startDate'>; // 'startDate'로 수정
}

function StartDatePicker({ field }: StartDatePickerProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>(new Date());

  // NOTE - 자동으로 날짜나 시간을 결정하는 부분이 변경되도록 설정 (ex. 날짜를 지정하면 자동으로 시간 지정으로 넘어감)
  const handleDatePickerOpen = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  // NOTE - 날짜와 시간을 지정하면 날짜 + 오전/오후 + 시간을 합쳐 startDate 키로 최종 값을 넘겨줌
  const updateDateTime = (day: Date | undefined) => {
    day!.setHours(15, 0, 0, 0);
    const dayToISOString = day?.toISOString();
    const splitDay = dayToISOString && `${dayToISOString.split('.')[0]}Z`;
    field.onChange(splitDay);
  };

  const handleDate = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      setIsDatePickerOpen(false);
      updateDateTime(day);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          readOnly
          className={`w-full cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${
            isDatePickerOpen ? 'border-2 border-brand-primary' : ''
          }`}
          placeholder={dateFormatter.toConvertDate(
            new Date(),
            'koreanFullDate'
          )}
          value={
            date ? dateFormatter.toConvertDate(date, 'koreanFullDate') : ''
          }
          onClick={handleDatePickerOpen}
        />
      </div>
      {isDatePickerOpen && <DatePick date={date} handleDate={handleDate} />}
    </>
  );
}

export default StartDatePicker;
