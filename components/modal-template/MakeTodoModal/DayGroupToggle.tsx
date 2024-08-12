import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { WEEKDAYS_ARRAY } from '@/constants/DateArray';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface DaySelectProps {
  field: ControllerRenderProps<any, 'weekDays'>;
}

function DayGroupToggle({ field }: DaySelectProps) {
  const selectedValues = field.value || [];

  // NOTE - 각각의 배열의 value를 가지고와 weekDays의 배열 키로 지정
  const handleWeekDayValue = (value: string[]) => {
    const numeberValue = value.map((v) => parseInt(v, 10));
    field.onChange(numeberValue);
  };

  return (
    <ToggleGroup
      type="multiple"
      value={selectedValues.map(String)}
      onValueChange={handleWeekDayValue}
    >
      {WEEKDAYS_ARRAY.map((day, idx) => (
        <ToggleGroupItem key={day} value={idx.toString()}>
          {day}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default DayGroupToggle;
