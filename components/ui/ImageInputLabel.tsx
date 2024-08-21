import { cn } from '@/lib/utils';
import EditButton from '@/public/icons/btn_edit.svg';

import { Skeleton } from './skeleton';

interface ImageInputWrapperProps {
  className?: string;
  children: React.ReactNode;
  variants?: 'circular' | 'board' | 'default';
  [key: string]: unknown;
}

interface ImageInputContentProps {
  className?: string;
  imagePreview?: string | null;
  children: React.ReactNode;
  isUploading?: boolean;
}

const imageInputVariants = {
  circular:
    'bg-customBackground-tertiary relative flex items-center justify-center',
  board: 'size-40 rounded-xl object-cover md:size-60 overflow-hidden',
  default: '',
};

const ImageInputWrapper = ({
  className = '',
  children,
  variants = 'default',
  ...props
}: ImageInputWrapperProps) => (
  <div className={cn(imageInputVariants[variants], className)} {...props}>
    {variants === 'circular' ? (
      <>
        <div className="h-[64px] w-[64px] overflow-hidden rounded-full border-[2px] border-customBorder-primary">
          {children}
        </div>
        <EditButton
          className="absolute bottom-[-4px] right-[-4px]"
          stroke="var(--background)"
        />
      </>
    ) : (
      children
    )}
  </div>
);

const ImageInputContent = ({
  className = '',
  imagePreview,
  isUploading = false,
  children,
}: ImageInputContentProps) => {
  if (isUploading) return <Skeleton className="z-0 h-full w-full" />;

  if (imagePreview)
    return (
      <img
        src={imagePreview}
        alt="이미지 미리보기"
        className={cn('h-full w-full object-cover', className)}
      />
    );

  return children;
};

const ImageInputUI = Object.assign(ImageInputWrapper, {
  Content: ImageInputContent,
});

export default ImageInputUI;
