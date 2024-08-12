'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { todoModalFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import DayGroupToggle from './DayGroupToggle';
import FrequencySelect from './FrequencySelect';
import StartDatePicker from './StartDatePicker';

const commonClassName =
  'flex h-[75px] w-full resize-none rounded-xl border border-input/10 bg-background-secondary px-4 py-[10px] text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-base';

function MakeTodoModal({ className = '' }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDayPickerOpen, setIsDayPickerOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof todoModalFormSchema>>({
    resolver: zodResolver(todoModalFormSchema),
    defaultValues: {
      name: '',
      description: '',
      frequencyType: 'ONCE',
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    },
  });

  // NOTE - form의 키를 추적
  const { watch, setValue } = form;

  const frequencyType = watch('frequencyType');
  const startDate = watch('startDate');

  // NOTE - frequencyType이 MONTHLY일 경우 monthDay의 키를 설정한 날짜로 지정
  React.useEffect(() => {
    if (frequencyType === 'MONTHLY' && startDate) {
      const date = new Date(startDate);
      const monthDay = date.getUTCDate();
      setValue('monthDay', monthDay);
    }
  }, [frequencyType, startDate, setValue]);

  const onSubmit = (values: z.infer<typeof todoModalFormSchema>) => {
    console.log(values);
    form.reset();
    setIsOpen(false);
  };

  // NOTE - 모달의 요일 설정 부분 렌더링 여부 결정 함수
  const handleDayPickerOpen = (value: boolean) => {
    setIsDayPickerOpen(value);
  };

  // NOTE - 모든 FormField 및 Controller에 키에 맞는 name 할당 및 field를 prop으로 내려줌으로서 value를 설정할 수 있도록 함.
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button variant="floating">+ 할 일 추가</Button>
      </DialogTrigger>
      <DialogContent hasCloseIcon className="z-[80]">
        <DialogTitle>할 일 만들기</DialogTitle>
        <DialogDescription />
        <p className="mt-[-20px] text-[14px] font-medium text-text-default">
          할 일은 실제로 실행 가능한 작업 중심으로
        </p>
        <p className="mt-[-20px] text-[14px] font-medium text-text-default">
          작성해주시면 좋습니다.
        </p>
        <div className="gap- flex w-full max-w-[336px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 제목</FormLabel>
                    <Input
                      className="rounded-xl"
                      placeholder="할 일 제목을 입력해주세요."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="startDate" // 필드 이름에 맞춰야 합니다.
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>시작 날짜 및 시간</FormLabel>
                    <StartDatePicker field={field} />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="frequencyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>반복 설정</FormLabel>
                    <FrequencySelect
                      field={field}
                      handleState={handleDayPickerOpen}
                    />
                  </FormItem>
                )}
              />
              {isDayPickerOpen && (
                <Controller
                  control={form.control}
                  name="weekDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>반복 요일</FormLabel>
                      <DayGroupToggle field={field} />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 메모</FormLabel>
                    <textarea
                      placeholder="메모를 입력해주세요."
                      {...field}
                      className={commonClassName}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-3">
                만들기
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MakeTodoModal;
