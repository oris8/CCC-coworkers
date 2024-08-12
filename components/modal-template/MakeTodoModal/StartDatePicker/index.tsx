import { Input } from '@/components/ui/input';
import { dateFormatter } from '@/lib/utils';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import DatePick from './DatePick';
import TimePick from './TimePick';

interface StartDatePickerProps {
  field: ControllerRenderProps<any, 'startDate'>; // 'startDate'로 수정
}

function StartDatePicker({ field }: StartDatePickerProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] =
    React.useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] =
    React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>('12:00');
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');

  // NOTE - 자동으로 날짜나 시간을 결정하는 부분이 변경되도록 설정 (ex. 날짜를 지정하면 자동으로 시간 지정으로 넘어감)
  const handleDatePickerOpen = () => {
    setIsDatePickerOpen((prev) => !prev);
    if (isTimePickerOpen) setIsTimePickerOpen(false);
  };

  const handleTimePickerOpen = () => {
    setIsTimePickerOpen((prev) => !prev);
    if (isDatePickerOpen) setIsDatePickerOpen(false);
  };

  // NOTE - 날짜와 시간을 지정하면 날짜 + 오전/오후 + 시간을 합쳐 startDate 키로 최종 값을 넘겨줌
  const updateDateTime = (
    day: Date | undefined,
    timeValue: string,
    periodValue: 'AM' | 'PM'
  ) => {
    if (day) {
      const [hours, minutes] = timeValue.split(':');
      const hourOffset = periodValue === 'AM' ? 0 : 12;
      day.setHours(parseInt(hours, 10) + hourOffset);
      day.setMinutes(parseInt(minutes, 10));
      field.onChange(day.toISOString());
    }
  };

  const handleDate = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      setIsDatePickerOpen(false);
      setIsTimePickerOpen(true);
      updateDateTime(day, time, period);
    }
  };

  const updateTimeValue = (periodValue: 'AM' | 'PM', timeValue: string) => {
    setPeriod(periodValue);
    setTime(timeValue);
    updateDateTime(date, timeValue, periodValue);
  };

  const handlePeriodChange = (periodValue: 'AM' | 'PM') => {
    updateTimeValue(periodValue, time);
  };

  const handleTimeChange = (timeValue: string) => {
    updateTimeValue(period, timeValue);
    setIsTimePickerOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          readOnly
          className={`w-[204px] cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${
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
        <Input
          readOnly
          className={`cursor-pointer rounded-xl focus:outline-none focus-visible:ring-0 ${
            isTimePickerOpen ? 'border-2 border-brand-primary' : ''
          }`}
          value={`${period === 'AM' ? '오전' : '오후'} ${time}`}
          onClick={handleTimePickerOpen}
        />
      </div>
      {isDatePickerOpen && <DatePick date={date} handleDate={handleDate} />}
      {isTimePickerOpen && (
        <TimePick
          period={period}
          time={time}
          handlePeriodChange={handlePeriodChange}
          handleTimeChange={handleTimeChange}
        />
      )}
    </>
  );
}

export default StartDatePicker;
