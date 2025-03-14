import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  projectId: string
  name: string
}

/**
 * プロジェクトを更新する
 */
export class UpdateProject {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const project = await this.c.var.database.prismaProject.findUnique({
        where: { id: props.projectId },
      })

      if (project === null) {
        return new HTTPException(404, {
          message: "プロジェクトが見つかりませんでした",
        })
      }

      const updated = await this.c.var.database.prismaProject.update({
        where: { id: props.projectId },
        data: {
          name: props.name,
          updatedAt: new Date(),
        },
      })

      return updated
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, {
          message: `プロジェクトの更新に失敗しました: ${error.message}`,
        })
      }
      return new HTTPException(500, {
        message: "プロジェクトの更新に失敗しました",
      })
    }
  }
}
