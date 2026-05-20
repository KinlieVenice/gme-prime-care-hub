// src/router.tsx
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: typeof window === "undefined" ? false : 3,
      },
    },
  });

  return createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });
}

const tempRouter = getRouter();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof tempRouter;
  }
}