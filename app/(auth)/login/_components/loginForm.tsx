'use client';

import PasswordResetModal from '@/components/modal-template/ResetPasswordModal';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/api/auth';
import { loginValidationSchema } from '@/lib/schema/auth';
import { SignInRequestBody } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function LoginForm() {
  const onSubmit: SubmitHandler<SignInRequestBody> = async (data) => {
    const res = await login(data);
    if (res?.error) {
      toast.error(res.error?.message || res.error.info);
    }
  };

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] text-white">이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] text-white">비밀번호</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="비밀번호를 입력해 주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordResetModal />

        <Button type="submit">로그인</Button>
      </form>
    </Form>
  );
}
