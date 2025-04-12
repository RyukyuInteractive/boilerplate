import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import { LoadingPage } from "~/interface/components/pages/loading-page"
import { SessionProvider } from "~/interface/components/session-provider"
import { ThemeProvider } from "~/interface/components/theme-provider"
import { Toaster } from "~/interface/components/ui/sonner"
import { apolloClient } from "~/lib/apollo-client"
import { routeTree } from "~/lib/route-tree.gen"

import "~/main.css"

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const container = document.getElementById("app")

if (container === null) {
  throw new Error("No container found")
}

const root = createRoot(container)

const queryClient = new QueryClient()

root.render(
  <ThemeProvider defaultTheme="dark">
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingPage />}>
          <SessionProvider>
            <RouterProvider router={router} />
            <Toaster />
          </SessionProvider>
        </Suspense>
      </QueryClientProvider>
    </ApolloProvider>
  </ThemeProvider>,
)
