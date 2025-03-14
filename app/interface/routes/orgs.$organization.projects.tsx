import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/orgs/$organization/projects")({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
