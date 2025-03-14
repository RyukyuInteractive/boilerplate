import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/password/restore")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
