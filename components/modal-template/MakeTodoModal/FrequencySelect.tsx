import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import frequencyTypeArray from '@/constants/FrequencyTypeArray';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface FrequencySelectProps {
  field: ControllerRenderProps<any, 'frequencyType'>;
  handleState: (value: boolean) => void;
}

function FrequencySelect({ field, handleState }: FrequencySelectProps) {
  // NOTE - frequencyType이 "WEEKLY"일 경우 ToggleGroup이 보이도록 함.
  React.useEffect(() => {
    if (field.value === 'WEEKLY') {
      handleState(true);
    } else {
      handleState(false);
    }
  }, [field.value, handleState]);

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className="w-[109px]">
        <SelectValue placeholder="한 번" />
      </SelectTrigger>
      <SelectContent className="z-select">
        {frequencyTypeArray.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FrequencySelect;
