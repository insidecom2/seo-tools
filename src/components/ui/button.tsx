import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border border-primary bg-primary text-primary-foreground hover:opacity-90',

        secondary:
          'border border-border bg-secondary text-secondary-foreground hover:bg-accent',

        outline:
          'border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',

        ghost:
          'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',

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
