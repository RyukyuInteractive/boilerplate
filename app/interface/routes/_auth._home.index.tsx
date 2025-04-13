import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/_home/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4">
      <p>{"ホーム"}</p>
    </div>
  )
}
