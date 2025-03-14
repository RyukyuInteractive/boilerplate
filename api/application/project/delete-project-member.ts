import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  id: string
}

/**
 * プロジェクトメンバーを削除する
 */
export class DeleteProjectMember {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const member = await this.c.var.database.prismaProjectMember.findUnique({
        where: { id: props.id },
      })

      if (member === null) {
        return new HTTPException(404, {
          message: "プロジェクトメンバーが見つかりません。",
        })
      }

      await this.c.var.database.prismaProjectMember.delete({
        where: { id: member.id },
      })

      return { id: member.id }
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, {
        message: "プロジェクトメンバーの削除に失敗しました。",
      })
    }
  }
}
