import React from 'react';
import { cn } from '../../../utils/cn';

export const Card = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-lg border border-gray-200 bg-white shadow-sm',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
