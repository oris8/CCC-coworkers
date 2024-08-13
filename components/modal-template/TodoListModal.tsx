import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
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

function TodoListModal({ className = '' }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
    setIsOpen(false);
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
              <Button type="submit">만들기</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TodoListModal;
