import cn from '@/lib/utils';
import EditButton from '@/public/icons/btn_edit.svg';

interface ImageInputWrapperProps {
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

interface ImageInputContentProps {
  className?: string;
  imagePreview?: string | null;
  children: React.ReactNode;
}

const ImageInputWrapper = ({
  className = '',
  children,
  ...props
}: ImageInputWrapperProps) => (
  <div
    className={cn(
      'bg-customBackground-tertiary relative flex h-[64px] w-[64px] items-center justify-center rounded-full border-[2px] border-customBorder-primary',
      className
    )}
    {...props}
  >
    {children}
    <EditButton
      className="absolute bottom-[-4px] right-[-4px]"
      stroke="var(--background)"
    />
  </div>
);

const ImageInputContent = ({
  className = '',
  imagePreview,
  children,
}: ImageInputContentProps) => {
  if (imagePreview)
    return (
      <img
        src={imagePreview}
        alt="Profile Preview"
        className={cn('h-full w-full rounded-full object-cover', className)}
      />
    );

  return children;
};

const ImageInputUI = Object.assign(ImageInputWrapper, {
  Content: ImageInputContent,
});

export default ImageInputUI;
