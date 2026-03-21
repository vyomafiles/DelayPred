import React from 'react';
import { cn } from '../../../utils/cn';

export const Input = React.forwardRef(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full px-4 py-2 border rounded-lg font-sans text-base',
          'border-gray-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
