'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
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
import useImageFile from '@/hooks/useImagePreview';
import useRequestFunction from '@/hooks/useRequestFunction';
import { updateGroup } from '@/lib/api/group';
import { createTeamValidationSchema } from '@/lib/schema/auth';
import TeamProfile from '@/public/icons/group_profile.svg';
import { Group } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type EditTeamProps = {
  groupData: Group;
};
export default function EditTeamForm({ groupData }: EditTeamProps) {
  const form = useForm<z.infer<typeof createTeamValidationSchema>>({
    resolver: zodResolver(createTeamValidationSchema),
    defaultValues: {
      name: groupData.name,
      image: groupData.image || undefined,
    },
  });
  const currentImage = form.watch('image');
  const router = useRouter();
  const { uploadedImage, imagePreview } = useImageFile(currentImage);

  const api = useRequestFunction(updateGroup);

  const onSubmit = async (data: z.infer<typeof createTeamValidationSchema>) => {
    const editTeamData: { name?: string; image?: string } = {};

    // 데이터 세팅
    if (groupData.name !== data.name) editTeamData.name = data.name;
    if (data?.image !== groupData.image && typeof uploadedImage === 'string') {
      editTeamData.image = uploadedImage;
    }

    // 변경사항이 없을 경우 toast
    if (!editTeamData.image && !editTeamData.name) {
      toast.error('변경된 내용이 없습니다');
      return;
    }

    await api.request(groupData.id, editTeamData);
  };

  // API 요청 결과에 따른 alert
  useEffect(() => {
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      toast.success('팀 수정이 완료되었습니다.');
      router.push(`/${groupData.id}`);
    }
  }, [
    api.isError,
    api.isSuccess,
    api.data,
    api.error?.info,
    api.error?.message,
    router,
    groupData.id,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="inline-block w-[max-content]">
                <ImageInputUI className="cursor-pointer">
                  <ImageInputUI.Content imagePreview={imagePreview}>
                    <TeamProfile width="60" height="60" />
                  </ImageInputUI.Content>
                </ImageInputUI>
              </FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  className="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>팀 이름</FormLabel>
              <FormControl>
                <Input placeholder="팀 이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={api.isPending}>
          {api.isPending ? '저장중...' : '수정하기'}
        </Button>
      </form>
    </Form>
  );
}
