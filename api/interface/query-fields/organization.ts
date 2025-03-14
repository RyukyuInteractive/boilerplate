import type { QueryFieldThunk } from "@pothos/core"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"
import { PothosOrganizationNode } from "~/interface/objects/organization-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

/**
 * 組織を取得する
 */
export const organization: QueryFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosOrganizationNode,
    args: {
      id: t.arg({ type: "ID", required: true }),
    },
    async resolve(_, args, c) {
      const organization = await c.var.database.prismaOrganization.findUnique({
        where: { id: args.id },
      })

      if (organization === null) {
        throw new NotFoundGraphQLError()
      }

      return organization
    },
  })
}
