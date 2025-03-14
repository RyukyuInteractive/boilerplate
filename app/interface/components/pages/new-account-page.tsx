import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/interface/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/interface/components/ui/card"
import { Input } from "~/interface/components/ui/input"
import { Label } from "~/interface/components/ui/label"
import { honoClient } from "~/lib/hono-client"

/**
 * 新規登録ページ
 */
export function NewAccountPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      // パスワードの一致確認
      if (password !== confirmPassword) {
        throw new Error("パスワードが一致しません")
      }
      const resp = await honoClient.auth.sign.up.$post({
        json: { email, password },
      })
      return resp.json()
    },
  })

  const onRegister = async () => {
    try {
      await mutation.mutateAsync()
      toast.success("アカウントを作成しました")
      navigate({ to: "/" })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className={"flex h-svh w-full flex-col items-center justify-center"}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{"-"}</CardTitle>
          <CardDescription>{"新規アカウントを作成"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{"メールアドレス"}</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{"パスワード"}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{"パスワード（確認）"}</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={onRegister}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "アカウント作成中..." : "アカウントを作成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
