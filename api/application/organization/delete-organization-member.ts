import type { Context } from "~/env"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

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
        return new NotFoundGraphQLError("組織メンバーが見つかりません。")
      }

      const result = await this.c.var.database.prismaOrganizationMember.delete({
        where: { id: member.id },
      })

      if (result instanceof Error) {
        return new InternalGraphQLError("組織メンバーの作成に失敗しました。")
      }

      return { id: member.id }
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
