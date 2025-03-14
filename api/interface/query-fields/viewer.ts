import type { QueryFieldThunk } from "@pothos/core"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosViewerNode } from "~/interface/objects/viewer-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

/**
 * ログイン中のユーザを取得する
 */
export const viewer: QueryFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosViewerNode,
    async resolve(_, _args, c) {
      const session = c.var.session

      if (session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const user = await c.var.database.prismaUser.findUnique({
        where: { id: session.userId },
      })

      if (user === null) {
        throw new InternalGraphQLError("User not found")
      }

      return user
    },
  })
}
