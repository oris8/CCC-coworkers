'use client';

import emitGroups from '@/app/api/pusher/group/emit';
import Checkbox from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { updateTask } from '@/lib/api/task';
import usePusherStore from '@/lib/store';
import { Id } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  done: z.boolean().default(false).optional(),
});

export default function CheckboxReactHookFormSingle({
  handleClick,
  id,
  task,
  isDone,
  userName,
  groupId,
}: {
  handleClick: (value: boolean) => void;
  id: Id;
  task: string;
  isDone: boolean;
  userName?: string;
  groupId: number;
}) {
  const { socketId } = usePusherStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      done: isDone,
    },
  });

  async function onSubmit(value: z.infer<typeof FormSchema>) {
    handleClick(!isDone);
    try {
      const { data } = await updateTask(id, value);
      if (data?.name) {
        await emitGroups({
          member: userName,
          action: 'edit',
          task: data?.name,
          roomId: String(groupId),
          socketId: socketId as string,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckBoxClick = (e: MouseEvent<HTMLElement>) => {
    // NOTE - 시트를 여는 트리거의 이벤트 버블링을 막는 용도
    e.stopPropagation();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="done"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-center gap-3"
              onClick={handleCheckBoxClick}
            >
              <FormControl>
                <Checkbox
                  type="submit"
                  checked={isDone}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  className={`relative bottom-[2px] cursor-pointer ${isDone && 'line-through'}`}
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
