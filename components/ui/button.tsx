import cn from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const commonClasses = {
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-[12px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-brand-primary text-white',
  hoverActiveDisabled:
    'hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive',
  outlinedCommon:
    'bg-white border border-brand-primary font-semibold text-brand-primary hover:text-interaction-hover hover:border-interaction-hover active:text-interaction-pressed active:border-interaction-pressed disabled:text-interaction-inactive disabled:border-interaction-inactive',
  floatingCommon:
    'font-semibold hover:bg-interaction-hover active:bg-interaction-pressed disabled:bg-interaction-inactive floating-shadow',
};

const buttonVariants = cva(commonClasses.base, {
  variants: {
    variant: {
      default: `font-semibold ${commonClasses.hoverActiveDisabled}`,
      danger: 'bg-status-danger text-[16px] text-white',
      outlined: commonClasses.outlinedCommon,
      floating: commonClasses.floatingCommon,
      'floating-outlined': commonClasses.outlinedCommon,
    },
    size: {
      'x-small': 'w-fit h-[32px] rounded-[12px] text-[14px] px-[10px]',
      default: 'w-full h-[48px] text-[16px]',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
  compoundVariants: [
    {
      variant: 'outlined',
      size: 'x-small',
      className: 'bg-transparent text-[14px]',
    },
    {
      variant: 'floating',
      size: 'default',
      className: 'w-fit rounded-[40px] px-[21px] py-[14px]',
    },
    {
      variant: 'floating',
      size: 'x-small',
      className: 'w-[111px] h-[40px] rounded-[40px]',
    },
    {
      variant: 'floating-outlined',
      size: 'default',
      className: 'w-fit h-[40px] rounded-[40px] px-[21px] py-[14px]',
    },
  ],
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
