import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  organizationMemberId: string
}

/**
 * 組織メンバーを削除する
 */
export class DeleteOrganizationMember {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const member =
        await this.c.var.database.prismaOrganizationMember.findUnique({
          where: {
            id: props.organizationMemberId,
          },
        })

      if (member === null) {
        return new HTTPException(404, {
          message: "組織メンバーが見つかりません。",
        })
      }

      await this.c.var.database.prismaOrganizationMember.delete({
        where: { id: member.id },
      })

      return { id: member.id }
    } catch (error) {
      return new HTTPException(500, {
        message: "組織メンバーの削除に失敗しました。",
      })
    }
  }
}
