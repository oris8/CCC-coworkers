'use client';

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
import { signup } from '@/lib/api/auth';
import { authValidationSchema } from '@/lib/schema/auth';
import { SignUpRequestBody } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function SignupForm() {
  const onSubmit: SubmitHandler<SignUpRequestBody> = async (data) => {
    const res = await signup(data);
    if (res?.error) {
      toast.error(res.error?.message || res.error.info);
    }
  };

  const form = useForm<z.infer<typeof authValidationSchema>>({
    resolver: zodResolver(authValidationSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onChange',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] text-white">이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해 주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] text-white">
                비밀번호 확인
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="비밀번호를 다시 한 번 입력해 주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
}
