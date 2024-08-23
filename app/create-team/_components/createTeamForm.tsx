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
import useRequestFunction from '@/hooks/useRequestFunction';
import uploadImage from '@/lib/api/common';
import { createGroup } from '@/lib/api/group';
import { createTeamValidationSchema } from '@/lib/schema/auth';
import TeamProfile from '@/public/icons/group_profile.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function CreateTeamForm() {
  const api = useRequestFunction(createGroup);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createTeamValidationSchema>>({
    resolver: zodResolver(createTeamValidationSchema),
  });

  const onSubmit = async (data: z.infer<typeof createTeamValidationSchema>) => {
    let imageUrl: string | undefined;

    if (data.image) {
      const imageResult = await uploadImage(data.image);
      if (imageResult.data) {
        imageUrl = imageResult.data;
      }
    }
    const teamData = {
      name: data.name,
      image: imageUrl,
    };

    await api.request(teamData);
  };

  const currentImage = form.watch('image');

  // 이미지 프리뷰 설정
  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    setImagePreview(URL.createObjectURL(currentImage));
  }, [currentImage]);

  // API 요청 결과에 따른 alert
  useEffect(() => {
    if (api.isError) {
      alert(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      alert('팀 생성이 완료되었습니다.');
    }
  }, [
    api.isError,
    api.isSuccess,
    api.data,
    api.error?.info,
    api.error?.message,
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
                <ImageInputUI variants="circular" className="cursor-pointer">
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
          {api.isPending ? '저장중...' : '생성하기'}
        </Button>
      </form>
    </Form>
  );
}
