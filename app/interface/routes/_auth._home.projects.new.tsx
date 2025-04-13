import { useMutation } from "@apollo/client"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/interface/components/ui/button"
import { Card } from "~/interface/components/ui/card"
import { Input } from "~/interface/components/ui/input"
import { Label } from "~/interface/components/ui/label"

export const Route = createFileRoute("/_auth/_home/projects/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const [name, setName] = useState("")

  const [nameEN, setNameEN] = useState("")

  const [createProject, { loading }] = useMutation(Mutation)

  const onSubmit = async () => {
    try {
      const { data } = await createProject({
        variables: {
          input: {
            name,
          },
        },
      })
      if (!data?.createProject) return
      navigate({
        to: "/$project",
        params: { project: data.createProject.id },
      })
      toast.success("プロジェクトを作成しました")
    } catch (error) {
      toast.error("エラーが発生しました")
    }
  }

  return (
    <div className="flex h-svh items-center justify-center">
      <div className="m-auto w-full max-w-lg space-y-8 p-4">
        <Card className="p-4">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <h1 className="font-bold">新規プロジェクト</h1>
            <div className="space-y-1">
              <Label>プロジェクト名</Label>
              <Input
                placeholder="新規プロジェクト"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>英語名</Label>
              <Input
                placeholder="New Project"
                value={nameEN}
                onChange={(event) => setNameEN(event.target.value)}
              />
            </div>
            <Button
              type={"submit"}
              className="w-full"
              disabled={!name || loading}
            >
              作成
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

const Mutation = graphql(`
  mutation Mutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
    }
  }
`)
