'use client';

import { cn } from '@/lib/utils';
import HidePasswordIcon from '@/public/icons/visibility_off.svg';
import ShowPasswordIcon from '@/public/icons/visibility_on.svg';
import * as React from 'react';

import { Input } from './input';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPasswordToggle = () => {
      setShowPassword((prev) => !prev);
    };

    const Icon = showPassword ? HidePasswordIcon : ShowPasswordIcon;

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn(className)}
          ref={ref}
          {...props}
        />
        <Icon
          className="absolute right-4 top-1/2 size-6 -translate-y-1/2 text-text-default"
          fill="currentColor"
          onClick={handleShowPasswordToggle}
        />
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
