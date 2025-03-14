import { HTTPException } from "hono/http-exception"
import type { Context } from "../../env"

type Props = {
  projectId: string
  userId: string
}

/**
 * プロジェクトにメンバーを追加する
 */
export class CreateProjectMember {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const project = await this.c.var.database.prismaProject.findUnique({
        where: { id: props.projectId },
      })

      if (project === null) {
        return new HTTPException(404, {
          message: "プロジェクトが見つかりません。",
        })
      }

      const member = await this.c.var.database.prismaProjectMember.create({
        data: {
          id: crypto.randomUUID(),
          projectId: props.projectId,
          userId: props.userId,
        },
      })

      return member
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, {
        message: "メンバーの追加に失敗しました。",
      })
    }
  }
}
