import type { QueryFieldThunk } from "@pothos/core"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"
import { PothosUserNode } from "~/interface/objects/user-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

/**
 * ユーザーを取得する
 */
export const user: QueryFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserNode,
    args: {
      id: t.arg({ type: "ID", required: true }),
    },
    async resolve(_, args, c) {
      const user = await c.var.database.prismaUser.findUnique({
        where: { id: args.id },
      })

      if (user === null) {
        throw new NotFoundGraphQLError()
      }

      return user
    },
  })
}
