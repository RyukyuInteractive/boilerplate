import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$project/profile")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
