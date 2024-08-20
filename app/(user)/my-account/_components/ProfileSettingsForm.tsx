'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useImageFile from '@/hooks/useImagePreview';
import useRequestFunction from '@/hooks/useRequestFunction';
import { updateUser } from '@/lib/api/user';
import { imageSchema, nameSchema } from '@/lib/schema/auth';
import Profile from '@/public/icons/profile.svg';
import { User } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  image: imageSchema,
  nickname: nameSchema,
});

type ProfileSettingsFormProps = Pick<User, 'image' | 'nickname'>;

const ProfileSettingsForm = ({ image, nickname }: ProfileSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: image || undefined,
      nickname,
    },
  });
  const currentImage = form.watch('image');
  const { uploadedImage, imagePreview } = useImageFile(currentImage);
  const api = useRequestFunction(updateUser);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProfile: { nickname?: string; image?: string } = {};
    // 데이터 세팅
    if (nickname !== values.nickname) updatedProfile.nickname = values.nickname;
    if (values?.image !== image && typeof uploadedImage === 'string') {
      updatedProfile.image = uploadedImage;
    }
    // 변경사항이 없을 경우 toast
    if (!updatedProfile.image && !updatedProfile.nickname) {
      toast.error('변경된 내용이 없습니다');
      return;
    }
    // API 요청
    await api.request(updatedProfile);
  }

  // API 요청 결과에 따른 로직처리
  useEffect(() => {
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
      api.reset();
    }
    if (api.isSuccess) {
      toast.success('변경사항이 저장되었습니다');
      api.reset();
    }
  }, [api, api.isError, api.isSuccess, api.error?.info, api.error?.message]);

  return (
    <Form.Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Form.FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <Form.FormItem>
              <Form.FormLabel className="inline-block w-[max-content]">
                <ImageInputUI>
                  <ImageInputUI.Content imagePreview={imagePreview}>
                    <Profile />
                  </ImageInputUI.Content>
                </ImageInputUI>
              </Form.FormLabel>
              <Form.FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  className="hidden"
                />
              </Form.FormControl>
              <Form.FormMessage />
            </Form.FormItem>
          )}
        />
        <Form.FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <Form.FormItem>
              <Form.FormLabel>이름</Form.FormLabel>
              <Form.FormControl>
                <Input {...field} placeholder="닉네임을 입력해주세요" />
              </Form.FormControl>
              <Form.FormMessage />
            </Form.FormItem>
          )}
        />
        <Button
          type="submit"
          className="absolute bottom-0 z-10"
          disabled={api.isPending}
        >
          {api.isPending ? '저장중...' : '변경사항 저장하기'}
        </Button>
      </form>
    </Form.Form>
  );
};

export default ProfileSettingsForm;
