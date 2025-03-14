import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/orgs/$organization/settings")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
