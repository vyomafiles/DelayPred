import React from 'react';
import { cn } from '../../../utils/cn';

export const Modal = React.forwardRef(
  ({ isOpen, onClose, title, children, className, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className={cn(
            'relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4',
            className
          )}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          {...props}
        >
          {title && (
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
