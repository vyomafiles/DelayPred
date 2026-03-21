import React from 'react';
import { cn } from '../../../utils/cn';

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-medium transition-colors duration-200 inline-flex items-center justify-center';
    
    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white',
      secondary: 'bg-white hover:bg-gray-50 text-primary-600 border border-primary-300',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
    };

    const sizes = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
