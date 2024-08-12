'use client';

import Checkbox from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  taskDone: z.boolean().default(false).optional(),
});

export default function CheckboxReactHookFormSingle({
  task,
  done = false,
}: {
  task: string;
  done?: boolean;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskDone: done,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    // NOTE - 시트를 여는 트리거의 이벤트 버블링을 막는 용도
    e.stopPropagation();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="taskDone"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center gap-3"
              onClick={handleClick}
            >
              <FormControl>
                <Checkbox
                  type="submit"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  className={`relative bottom-[2px] ${field.value && 'line-through'}`}
                >
                  {task}
                </FormLabel>
                <FormDescription />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
