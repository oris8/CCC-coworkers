'use client';

import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/button';
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
import { updatePassword } from '@/lib/api/user';
import { passwordConfirmSchema, passwordSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Ref, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordConfirmSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

function UpdatePasswordModal(
  { className = '', ...props },
  ref: Ref<HTMLButtonElement>
) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await updatePassword({
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
    if (res?.error) {
      toast.error(res.error?.message || res.error?.info);
      return;
    }
    form.reset();
    setIsOpen(false);
    toast.success('비밀번호가 성공적으로 변경되었습니다.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className} ref={ref}>
        <Button size="x-small" className="hidden" {...props}>
          변경하기
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseIcon>
        <DialogTitle>비밀번호 재설정</DialogTitle>
        <DialogDescription>
          새롭게 사용할 비밀번호를 입력해주세요
        </DialogDescription>
        <div className="gap- flex w-full max-w-[280px] flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <PasswordInput
                      placeholder="비밀번호를 입력해주세요."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <PasswordInput
                      placeholder="비밀번호를 한 번 더 입력해주세요."
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-3">
                변경하기
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

UpdatePasswordModal.displayName = 'UpdatePasswordModal';

export default forwardRef(UpdatePasswordModal);
