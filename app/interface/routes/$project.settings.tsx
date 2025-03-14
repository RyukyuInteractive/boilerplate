import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$project/settings")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
