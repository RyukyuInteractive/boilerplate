import { createFileRoute } from "@tanstack/react-router"
import { Button } from "~/interface/components/ui/button"
import { Card, CardContent } from "~/interface/components/ui/card"
import { Input } from "~/interface/components/ui/input"
import { Label } from "~/interface/components/ui/label"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createFileRoute("/_auth/_home/my/account")({
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
        <h1 className="font-bold text-2xl">アカウント</h1>
        <p className="text-muted-foreground">{"テキスト"}</p>
      </div>
      <Card>
        <CardContent className="space-y-4 p-4">
          <p className="font-bold">{"ログインID"}</p>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>ログインID</Label>
              <Input placeholder="" />
            </div>
            <Button className="w-full">保存</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-4">
          <p className="font-bold">{"メールアドレス"}</p>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>現在のメールアドレス</Label>
              <Input type={"password"} placeholder="" />
            </div>
            <div className="space-y-2">
              <Label>新しいメールアドレス</Label>
              <Input type={"password"} placeholder="" />
            </div>
            <Button className="w-full">保存</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-4">
          <p className="font-bold">{"パスワード"}</p>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>現在のパスワード</Label>
              <Input type={"password"} placeholder="" />
            </div>
            <div className="space-y-2">
              <Label>新しいパスワード</Label>
              <Input type="password" placeholder="" />
            </div>
            <Button className="w-full">保存</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
