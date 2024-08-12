import { cn } from '@/lib/utils';
import NextIcon from '@/public/icons/calender/next_date_icon.svg';
import PrevIcon from '@/public/icons/calender/prev_date_icon.svg';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);

  const isSelectedDayToday =
    selectedDay &&
    new Date(selectedDay).toDateString() === new Date().toDateString();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'w-full rounded-3xl bg-background-secondary p-3',
        className
      )}
      onDayClick={(day) => setSelectedDay(day)}
      classNames={{
        months: 'flex flex-col space-y-4 w-full', // 'w-full' 추가
        month: 'space-y-4 w-full', // 'w-full' 추가
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-full font-normal text-[0.8rem]', // 'w-full' 추가
        row: 'flex w-full',
        cell: 'h-9 w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-background-secondary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20', // 'w-full'로 변경
        day: cn('h-9 w-full p-0 font-normal aria-selected:opacity-100'), // 'w-full'로 변경
        day_range_end: 'day-range-end',
        day_selected:
          'font-normal rounded-[10px] bg-brand-primary text-background-secondary',
        day_today: cn('bg-transparent text-brand-primary', {
          'bg-transparent text-background-secondary': isSelectedDayToday,
        }),
        day_outside: cn(
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          {
            'bg-transparent': isSelectedDayToday,
          }
        ),
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-shadow, react/no-unstable-nested-components, @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <PrevIcon />,
        // eslint-disable-next-line @typescript-eslint/no-shadow, react/no-unstable-nested-components, @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <NextIcon />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
