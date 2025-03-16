import type { MutationFieldThunk } from "@pothos/core"
import { DeleteOrganization } from "~/application/organization/delete-organization"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const deleteOrganization: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: "ID",
    description: "組織を削除する",
    args: {
      organizationId: t.arg.string({ required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new DeleteOrganization(c)

      const result = await service.run({
        id: args.organizationId,
        userId: c.var.session.userId,
      })

      if (result instanceof Error) {
        throw result
      }

      return result.id
    },
  })
}
