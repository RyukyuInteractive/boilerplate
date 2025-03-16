import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  userId: string
  name: string
  nameEN?: string | null
  organizationId?: string | null
}

export class CreateProject {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const user = await this.c.var.database.prismaUser.findUnique({
        where: { id: props.userId },
      })

      if (user === null) {
        return new HTTPException(404, { message: "ユーザーが見つかりません。" })
      }

      const projectId = crypto.randomUUID()

      const project = await this.c.var.database.prismaProject.create({
        data: {
          id: projectId,
          login: projectId,
          name: props.name,
          organizationId: props.organizationId || null,
          internalProjectId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })

      await this.c.var.database.prismaProjectMember.create({
        data: {
          id: crypto.randomUUID(),
          projectId: project.id,
          userId: props.userId,
          role: "OWNER",
          createdAt: new Date(),
        },
      })

      return project
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, {
        message: "プロジェクトの作成に失敗しました。",
      })
    }
  }
}
