'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
import { Button } from '@/components/ui/button';
import * as Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useRequestFunction from '@/hooks/useRequestFunction';
import { createArticle } from '@/lib/api/article';
import uploadImage from '@/lib/api/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  image: z
    .custom<
      File | string | undefined
    >((v) => v instanceof File || typeof v === 'string' || undefined)
    .optional(),
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  content: z.string().min(1, { message: '내용을 입력해주세요' }),
});

const BoardAddForm = () => {
  const router = useRouter();
  const api = useRequestFunction(createArticle);
  const [imagePreview, setImagePreview] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      title: '',
      content: '',
    },
  });

  const handleImageUpload = async (image: File | string | undefined) => {
    if (image instanceof File) {
      const { data } = await uploadImage(image);
      return data;
    }
    return typeof image === 'string' ? image : null;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageUrl = await handleImageUpload(values.image);
    const requestData = { ...values, image: imageUrl };

    if (!imageUrl) {
      delete requestData.image;
    }

    const result = await api.request(requestData);

    if (!result?.error) {
      router.push('/boards?page=1');
    }
  }

  const currentImage = form.watch('image');

  // 이미지 프리뷰 설정
  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    setImagePreview(URL.createObjectURL(currentImage));
  }, [currentImage]);

  // API 요청 결과에 따른 로직처리
  useEffect(() => {
    if (api.isError) {
      toast.error(api.error?.message || api.error?.info);
    }
    if (api.isSuccess) {
      toast.success('글이 등록되었습니다');
    }
  }, [
    api.isError,
    api.isSuccess,
    api.data,
    api.error?.info,
    api.error?.message,
  ]);

  return (
    <Form.Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium md:text-xl md:font-bold">
            게시글 쓰기
          </p>
          <Button
            type="submit"
            className="z-10 hidden w-[184px] md:block"
            disabled={api.isPending}
          >
            {api.isPending ? '저장중...' : '등록'}
          </Button>
        </div>
        <hr className="my-6 md:my-8" />
        <Form.FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <Form.FormItem>
              <Form.FormLabel>* 제목</Form.FormLabel>
              <Form.FormControl>
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요"
                  className="md:px-6"
                />
              </Form.FormControl>
              <Form.FormMessage />
            </Form.FormItem>
          )}
        />
        <Form.FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <Form.FormItem>
              <Form.FormLabel>* 내용</Form.FormLabel>
              <Form.FormControl>
                {/* NOTE - Input placeholder 텍스트를 따라가기 위해 sm을 이용하였습니다. */}
                <textarea
                  {...field}
                  placeholder="내용을 입력해주세요"
                  className="min-h-[240px] w-full resize-none rounded-xl border border-input/10 bg-background-secondary px-4 py-2 text-sm text-primary placeholder:text-muted-foreground placeholder:text-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-base md:px-6 md:py-4"
                />
              </Form.FormControl>
              <Form.FormMessage />
            </Form.FormItem>
          )}
        />
        <p>이미지</p>
        <Form.FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <Form.FormItem>
              <Form.FormLabel className="inline-block w-[max-content]">
                <ImageInputUI variants="board">
                  <ImageInputUI.Content imagePreview={imagePreview}>
                    <div className="flex size-40 cursor-pointer flex-col items-center justify-center gap-y-3 rounded-xl bg-background-secondary text-[#9CA3AF] md:size-60">
                      <p className="text-2xl md:text-5xl">+</p>
                      <p className="text-sm md:text-base">이미지 등록</p>
                    </div>
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
        <Button
          type="submit"
          className="z-10 md:hidden"
          disabled={api.isPending}
        >
          {api.isPending ? '저장중...' : '등록'}
        </Button>
      </form>
    </Form.Form>
  );
};

export default BoardAddForm;
