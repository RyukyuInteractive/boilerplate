import { Outlet, createRootRoute } from "@tanstack/react-router"
import { LoginPage } from "~/interface/components/pages/login-page"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const [session] = useSession()

  if (session === null) {
    return <LoginPage />
  }

  return <Outlet />
}
