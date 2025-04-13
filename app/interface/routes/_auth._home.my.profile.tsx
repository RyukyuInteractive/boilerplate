import { createFileRoute } from "@tanstack/react-router"
import { Button } from "~/interface/components/ui/button"
import { Card, CardContent } from "~/interface/components/ui/card"
import { Input } from "~/interface/components/ui/input"
import { Label } from "~/interface/components/ui/label"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createFileRoute("/_auth/_home/my/profile")({
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
        <h1 className="font-bold text-2xl">プロフィール</h1>
        <p className="text-muted-foreground">{"テキスト"}</p>
      </div>
      <div className="max-w-md">
        <Card className="p-0">
          <CardContent className="space-y-4 p-4">
            <p className="font-bold">{"基本情報"}</p>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>名前</Label>
                <Input placeholder="名前" />
              </div>
              <Button className="w-full">保存</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
