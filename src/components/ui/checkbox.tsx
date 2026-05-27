import * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}

export { Checkbox };
