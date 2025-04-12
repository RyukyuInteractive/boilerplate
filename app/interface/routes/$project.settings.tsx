import { useSuspenseQuery } from "@apollo/client"
import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { Button } from "~/interface/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/interface/components/ui/card"
import { Input } from "~/interface/components/ui/input"
import { Label } from "~/interface/components/ui/label"
import { Separator } from "~/interface/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/interface/components/ui/tabs"
import { Textarea } from "~/interface/components/ui/textarea"

export const Route = createFileRoute("/$project/settings")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data } = useSuspenseQuery(ProjectQuery, {
    variables: { id: params.project },
  })
  const project = data.node as {
    id: string
    name: string
    description: string | null
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-bold text-3xl tracking-tight">プロジェクト設定</h1>
        <p className="mt-2 text-muted-foreground">
          プロジェクトのプロフィールと設定を管理します
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="general">一般設定</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>プロジェクトプロフィール</CardTitle>
              <CardDescription>
                プロジェクトの基本情報を設定します。この情報はプロジェクトメンバーに公開されます。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">プロジェクト名</Label>
                  <Input id="name" defaultValue={project.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">プロジェクト説明</Label>
                  <Textarea
                    id="description"
                    defaultValue={project.description || ""}
                    placeholder="プロジェクトの説明を入力してください"
                  />
                </div>
                <Button>保存</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>一般設定</CardTitle>
              <CardDescription>
                プロジェクトの一般設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visibility">可視性</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="private"
                      name="visibility"
                      defaultChecked
                    />
                    <Label htmlFor="private">
                      プライベート - プロジェクトメンバーのみアクセス可能
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="public" name="visibility" />
                    <Label htmlFor="public">
                      公開 - 組織のメンバー全員がアクセス可能
                    </Label>
                  </div>
                </div>
                <Separator />
                <div className="pt-4">
                  <Button>設定を保存</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                プロジェクトの通知設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>通知を受け取る項目</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-updates"
                      defaultChecked
                    />
                    <Label htmlFor="notification-updates">
                      プロジェクトの更新
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-members"
                      defaultChecked
                    />
                    <Label htmlFor="notification-members">メンバーの変更</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notification-comments"
                      defaultChecked
                    />
                    <Label htmlFor="notification-comments">コメント</Label>
                  </div>
                </div>
                <Separator />
                <div className="pt-4">
                  <Button>設定を保存</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ProjectQuery = graphql(
  `query ProjectQuery($id: ID!) {
    node(id: $id) {
      ... on Project {
        id
        name
        description
      }
    }
  }`,
)
