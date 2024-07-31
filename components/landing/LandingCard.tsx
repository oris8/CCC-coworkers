import cn from '@/lib/utils';
import * as React from 'react';

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LandingContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const LandingCard = React.forwardRef<HTMLDivElement, LandingCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'h-[467px] rounded-xl border md:h-[354px] md:justify-center xl:h-[419px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
LandingCard.displayName = 'LandingCard';

const LandingContainer = React.forwardRef<
  HTMLDivElement,
  LandingContainerProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative mx-auto flex h-full w-[235px] flex-col md:w-full md:flex-row md:px-40 xl:px-[174px]',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
LandingContainer.displayName = 'LandingContainer';

export { LandingCard, LandingContainer };
