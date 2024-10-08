'use client';

import UpdatePasswordModal from '@/components/modal-template/UpdatePasswordModal';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/api/auth';
import { emailSchema, passwordSchema } from '@/lib/schema/auth';
import { User } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type SecuritySettingsFormProps = Pick<User, 'email'>;

const SecuritySettingsForm = ({ email }: SecuritySettingsFormProps) => {
  const modalRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      password: '',
    },
  });

  async function validationPassword(values: z.infer<typeof formSchema>) {
    const { error } = await login(
      {
        email: values.email,
        password: values.password,
      },
      { redirect: false }
    );
    form.reset();
    if (error) {
      toast.error(error?.message || '현재 비밀번호를 정확하게 입력해주세요');
      return;
    }
    if (modalRef.current) {
      modalRef.current.click();
    }
  }

  return (
    <>
      <Form.Form {...form}>
        <form
          className="my-8 w-full space-y-8"
          onSubmit={form.handleSubmit(validationPassword)}
        >
          <Form.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>이메일</Form.FormLabel>
                <Form.FormControl>
                  <Input {...field} disabled />
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
          <Form.FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.FormItem>
                <Form.FormLabel>비밀번호</Form.FormLabel>
                <Form.FormControl>
                  <div className="relative">
                    <PasswordInput
                      placeholder="현재 비밀번호를 입력해주세요"
                      {...field}
                    />
                    <Button
                      size="x-small"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      type="submit"
                    >
                      변경하기
                    </Button>
                  </div>
                </Form.FormControl>
                <Form.FormMessage />
              </Form.FormItem>
            )}
          />
        </form>
      </Form.Form>
      <UpdatePasswordModal ref={modalRef} />
    </>
  );
};

export default SecuritySettingsForm;
