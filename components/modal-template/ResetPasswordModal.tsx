import {
  Dialog,
  DialogClose,
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
  email: z
    .string()
    .min(0, { message: '이메일을 입력해주세요' })
    .email({ message: '유효한 이메일 주소를 입력해주세요' }),
});

function ResetPasswordModal({ className = '' }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={className} asChild>
        <button
          type="button"
          className="w-full cursor-pointer text-[14px] font-medium text-brand-primary underline"
        >
          비밀번호를 잊으셨나요?
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>비밀번호 재설정</DialogTitle>
        <DialogDescription>
          비밀번호 재설정 링크를 보내드립니다.
        </DialogDescription>
        <div className="gap- flex w-full max-w-[280px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="이메일을 입력해주세요" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outlined">닫기</Button>
                </DialogClose>
                <Button type="submit">링크 보내기</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPasswordModal;
