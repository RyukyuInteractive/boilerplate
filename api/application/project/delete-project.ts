import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  projectId: string
}

/**
 * プロジェクトを論理削除する
 */
export class DeleteProject {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const project = await this.c.var.database.prismaProject.findUnique({
        where: {
          id: props.projectId,
          deletedAt: null,
        },
      })

      if (project === null) {
        return new HTTPException(404, {
          message: "プロジェクトが見つかりません。",
        })
      }

      const updatedProject = await this.c.var.database.prismaProject.update({
        where: { id: project.id },
        data: { deletedAt: new Date() },
      })

      return { id: updatedProject.id }
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, {
        message: "プロジェクトの削除に失敗しました。",
      })
    }
  }
}
