import { Calendar } from '@/components/ui/calendar';
import React from 'react';

function DatePick({
  date,
  handleDate,
}: {
  date: Date | undefined;
  handleDate: (day: Date | undefined) => void;
}) {
  return (
    <div className="flex w-[336px] items-center justify-center">
      <Calendar
        mode="single"
        className="rounded-xl border-2 border-brand-primary"
        selected={date}
        onSelect={handleDate}
        initialFocus
      />
    </div>
  );
}

export default DatePick;
