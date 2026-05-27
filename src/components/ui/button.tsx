import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border border-slate-900 bg-slate-900 text-white hover:bg-slate-800',

        secondary: 'border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200',

        outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',

        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',

        destructive: 'border border-red-600 bg-red-600 text-white hover:bg-red-700',
      },

      size: {
        sm: 'h-8 px-3',
        default: 'h-10 px-4',
        lg: 'h-10 px-5',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
