'use client';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CalenderButton from '@/public/icons/list/calender_icon.svg';
import * as React from 'react';

interface DatePickerProps {
  onClick: (value: Date) => void;
}

function DatePicker({ onClick }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleDate = (day: Date | undefined) => {
    setDate(day);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (date) {
      onClick(date);
    }
  }, [date, onClick]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button type="button" aria-label="달력 표시 버튼">
          <CalenderButton />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-3xl p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(DatePicker);
