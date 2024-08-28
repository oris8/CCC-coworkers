'use client';

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
import useRequestFunction from '@/hooks/useRequestFunction';
import { inviteMemberViaLink } from '@/lib/api/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  token: z.string().min(1, {
    message: '팀 링크를 입력하세요.',
  }),
});

export default function InvitationTeamForm({
  userEmail,
}: {
  userEmail: string;
}) {
  const api = useRequestFunction(inviteMemberViaLink);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await api.request({ userEmail, token: data.token });
  };

  // API 요청 결과에 따른 alert
  useEffect(() => {
    console.log('API Error:', api.isError);
    console.log('API Success:', api.isSuccess);
    console.log('API Data:', api.data);
    console.log('API Error Info:', api.error?.info);
    console.log('API Error Message:', api.error?.message);
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      toast.success('팀 참여가 완료되었습니다.');
      router.push(`/${api.data?.groupId}`);
    }
  }, [
    api.isError,
    api.isSuccess,
    api.data,
    api.error?.info,
    api.error?.message,
    router,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>팀 링크</FormLabel>
              <FormControl>
                <Input placeholder="팀 링크를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={api.isPending}>
          {api.isPending ? '참여하는중...' : '참여하기'}
        </Button>
      </form>
    </Form>
  );
}
