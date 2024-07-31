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
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
  todoTitle: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(10, { message: '최대로 입력할 수 있는 글자수는 10개입니다.' }),
  todoMemo: z
    .string()
    .min(2, { message: '최소 2자 이상 입력해주세요.' })
    .max(30, { message: '최대로 입력할 수 있는 글자수는 30개입니다.' }),
});

function MakeTodoModal({ className = '' }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todoTitle: '',
      todoMemo: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        <Button variant="floating">+ 할 일 추가</Button>
      </DialogTrigger>
      <DialogContent hasCloseIcon>
        <DialogTitle>할 일 만들기</DialogTitle>
        <DialogDescription>
          할 일은 실제로 실행 가능한 작업 중심으로
          <br /> 작성해주시면 좋습니다.
        </DialogDescription>
        <div className="gap- flex w-full max-w-[280px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="todoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 제목</FormLabel>
                    <Input
                      placeholder="할 일 제목을 입력해주세요."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="todoMemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>할 일 메모</FormLabel>
                    <textarea
                      placeholder="메모를 입력해주세요."
                      {...field}
                      className="flex h-[75px] w-full max-w-[280px] resize-none rounded-md border border-input/10 bg-background-secondary px-4 py-[10px] text-sm text-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:text-base"
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
