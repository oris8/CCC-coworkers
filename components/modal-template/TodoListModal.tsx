'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { createTaskList } from '@/lib/api/taskList';
import Spinner from '@/public/icons/spinner_icon.svg';
import { GroupTask } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(20, { message: '최대로 입력할 수 있는 글자수는 20개입니다.' }),
});

function TodoListModal({
  groupId,
  className = '',
  handleList,
}: {
  groupId: number;
  className?: string;
  handleList?: (value: Omit<GroupTask, 'tasks'>) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const res = await createTaskList(groupId, { name: values.name });
    if (res.data && handleList) {
      handleList(res.data);
      const params = new URLSearchParams(searchParams);
      params.set('task-list', res.data.id.toString());
      replace(`${pathname}?${params.toString()}`);
      setIsOpen(false);
    } else if (res.data) {
      window.location.reload();
      form.reset();
      setIsOpen(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={className} asChild>
        <button
          type="button"
          className="text-[14px] font-normal text-brand-primary"
        >
          + 새로운 목록 추가하기
        </button>
      </DialogTrigger>
      <DialogContent hasCloseIcon>
        <DialogTitle>할 일 목록</DialogTitle>
        <DialogDescription />
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
                    <Input placeholder="목록 명을 입력해주세요" {...field} />
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

export default TodoListModal;
