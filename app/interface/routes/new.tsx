import { createFileRoute } from "@tanstack/react-router"
import { NewAccountPage } from "~/interface/components/pages/new-account-page"

export const Route = createFileRoute("/new")({
  component: RouteComponent,
})

/**
 * 新規登録
 */
function RouteComponent() {
  return <NewAccountPage />
}
