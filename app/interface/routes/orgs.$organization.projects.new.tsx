import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/orgs/$organization/projects/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
