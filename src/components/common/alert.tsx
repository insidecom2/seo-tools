import { useEffect } from 'react';
import { X } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { useAlertStore } from '@/src/stores/alert';

export const AlertComm = () => {
  const { isShow, message, variant, setShow } = useAlertStore();
  const alertVariant = variant === "danger" ? "destructive" : variant;

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isShow, setShow]);

  return (
    isShow ? (
      <div className="fixed right-3 top-3 z-[10500] w-[calc(100%-1.5rem)] max-w-md">
        <Alert
          variant={alertVariant}
          className="flex items-start justify-between gap-3 shadow-lg transition-all"
        >
          <div className="min-w-0">
            <AlertTitle>
              {variant === 'success'
                ? 'Success'
                : variant === 'info'
                  ? 'Info'
                  : variant === 'warning'
                    ? 'Warning'
                    : 'Error'}
            </AlertTitle>
            <AlertDescription className="break-words">{message}</AlertDescription>
          </div>
          <button
            type="button"
            aria-label="Dismiss alert"
            className="rounded-md p-1 text-current transition hover:bg-black/5"
            onClick={() => setShow(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      </div>
    ) : null
  );
};
