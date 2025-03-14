import type { MutationFieldThunk } from "@pothos/core"
import { DeleteProjectMember } from "~/application/project/delete-project-member"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const deleteProjectMember: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: "ID",
    description: "プロジェクトメンバーを削除する",
    args: {
      id: t.arg.string({ required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new DeleteProjectMember(c)

      const result = await service.run({
        id: args.id,
      })

      if (result instanceof Error) {
        if (result.status === 404) {
          throw new NotFoundGraphQLError()
        }
        throw new InvalidArgumentGraphQLError(
          "プロジェクトメンバーの削除に失敗しました。",
        )
      }

      return result.id
    },
  })
}
