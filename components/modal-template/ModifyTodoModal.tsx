'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateTask } from '@/lib/api/task';
import Spinner from '@/public/icons/spinner_icon.svg';
import { Id } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { commonClassName } from './MakeTodoModal';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(20, { message: '최대로 입력할 수 있는 글자수는 20개입니다.' }),
  description: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(20, { message: '최대로 입력할 수 있는 글자수는 20개입니다.' }),
});

function ModifyTodoModal({
  taskId,
  onClose,
}: {
  taskId?: Id;
  onClose: (value: boolean) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (taskId) {
      setIsLoading(true);
      await updateTask(taskId, values);
      router.refresh();
      setTimeout(() => {
        setIsLoading(false);
        form.reset();
        onClose(true);
      }, 2000);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        hasCloseIcon
        onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <DialogTitle>할 일 변경</DialogTitle>
        <DialogDescription />
        <p className="mt-[-20px] text-[14px] font-medium text-text-default">
          할 일 이름과 추가하셨던 메모를 변경 가능합니다.
        </p>
        <div className="gap- flex w-full max-w-[280px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목 변경</FormLabel>
                    <Input placeholder="목록 명을 입력해주세요" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메모 변경</FormLabel>
                    <textarea
                      placeholder="메모를 입력해주세요."
                      {...field}
                      className={commonClassName}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner className="rolling" /> : '만들기'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModifyTodoModal;
