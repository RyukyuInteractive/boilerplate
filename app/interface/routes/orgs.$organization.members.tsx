import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/orgs/$organization/members")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
