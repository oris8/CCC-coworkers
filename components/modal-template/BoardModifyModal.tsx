'use client';

import ImageInputUI from '@/components/ui/ImageInputLabel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import * as Form from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useRequestFunction from '@/hooks/useRequestFunction';
import { updateArticle } from '@/lib/api/article';
import uploadImage from '@/lib/api/common';
import { ArticleDetail } from '@ccc-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  image: z
    .custom<
      File | string | undefined | null
    >((v) => v instanceof File || typeof v === 'string' || v === undefined || v === null)
    .optional(),
  title: z.string().min(1, { message: '최소 한 글자 이상 입력해야합니다.' }),
  content: z.string().min(1, { message: '최소 한 글자 이상 입력해야합니다.' }),
});

function BoardModifyModal({
  onClose,
  article,
}: {
  onClose: () => void;
  article: ArticleDetail;
}) {
  const router = useRouter();
  const api = useRequestFunction(updateArticle);
  const [imagePreview, setImagePreview] = useState(article.image || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      title: article.title,
      content: article.content,
    },
  });

  const handleImageUpload = async (image: File | string | undefined | null) => {
    if (image instanceof File) {
      const { data } = await uploadImage(image);
      return data;
    }
    return typeof image === 'string' ? image : null;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageUrl = await handleImageUpload(values.image!);
    const requestData: z.infer<typeof formSchema> = {
      ...values,
      image: imageUrl ?? null,
    };

    if (!imageUrl) {
      requestData.image = null;
    }
    console.log(requestData);
    const result = await api.request(article.id, requestData);

    if (!result?.error) {
      router.refresh();
      toast.success('글이 수정되었습니다.');
      onClose();
    } else {
      toast.error('글 수정에 실패하였습니다.');
      onClose();
    }
  }

  const handleImage = () => {
    setImagePreview('');
    form.setValue('image', null);
  };

  const currentTitle = form.watch('title');
  const currentContent = form.watch('content');
  const currentImage = form.watch('image');

  const isButtonDisabled = !currentTitle && !currentContent && !currentImage;

  // 이미지 프리뷰 설정
  useEffect(() => {
    if (!currentImage || typeof currentImage === 'string') return;
    setImagePreview(URL.createObjectURL(currentImage));
  }, [currentImage]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        hasCloseIcon
        className="max-w-[600px]"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <DialogTitle>게시글 수정</DialogTitle>
        <DialogDescription>게시글을 수정하시겠어요?</DialogDescription>
        <Form.Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form.FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>제목</Form.FormLabel>
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
                  <Form.FormLabel>내용</Form.FormLabel>
                  <Form.FormControl>
                    <textarea
                      {...field}
                      placeholder="내용을 입력해주세요"
                      className="min-h-[120px] w-full resize-none rounded-xl border border-input/10 bg-background-secondary px-4 py-2 text-sm text-primary placeholder:text-muted-foreground placeholder:text-text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-base md:px-6 md:py-4"
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <p>이미지</p>
              {imagePreview && (
                <Button
                  variant="outlined"
                  size="x-small"
                  aria-label="적용한 이미지 지우기 버튼"
                  onClick={handleImage}
                  className="bg-transparent"
                >
                  이미지 제거
                </Button>
              )}
            </div>
            <Form.FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <Form.FormItem className="h-[180px]">
                  <Form.FormLabel className="inline-block size-40">
                    <ImageInputUI variants="modify">
                      <ImageInputUI.Content imagePreview={imagePreview}>
                        <div className="flex size-40 cursor-pointer flex-col items-center justify-center gap-y-3 rounded-xl border bg-background-secondary text-[#9CA3AF]">
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
              className="z-10"
              disabled={api.isPending || isButtonDisabled}
            >
              {api.isPending ? '수정중...' : '수정'}
            </Button>
          </form>
        </Form.Form>
      </DialogContent>
    </Dialog>
  );
}

export default BoardModifyModal;
