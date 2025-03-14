import { createFileRoute } from "@tanstack/react-router"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createFileRoute("/_main/my/settings")({
  component: RouteComponent,
})

function RouteComponent() {
  const [session] = useSession()

  if (session === null) {
    return null
  }

  return (
    <div className="container space-y-4 p-4">
      <div>
        <h1 className="font-bold text-2xl">設定</h1>
        <p className="text-muted-foreground">{"テキスト"}</p>
      </div>
    </div>
  )
}
