import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-md border px-4 py-3 text-sm shadow-none',
  {
    variants: {
      variant: {
        default: 'border-slate-200 bg-white text-slate-900',
        success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        info: 'border-slate-200 bg-slate-50 text-slate-800',
        warning: 'border-amber-200 bg-amber-50 text-amber-800',
        destructive: 'border-red-200 bg-red-50 text-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
  return <h5 className={cn('mb-1 font-medium', className)} {...props} />;
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('text-sm', className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
