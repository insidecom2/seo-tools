"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function QueryProviders({ children }: { children: ReactNode }) {
  const env = process.env.NEXT_ENV || "development";
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env === "development" ? (
        <ReactQueryDevtools initialIsOpen={true} />
      ) : null}
    </QueryClientProvider>
  );
}
