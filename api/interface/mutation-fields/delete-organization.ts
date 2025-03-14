import type { MutationFieldThunk } from "@pothos/core"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const deleteOrganization: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: "ID",
    description: "組織を論理削除する",
    args: {
      organizationId: t.arg.string({ required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const organization = await c.var.database.prismaOrganization.findUnique({
        where: {
          id: args.organizationId,
          deletedAt: null,
        },
      })

      if (organization === null) {
        throw new NotFoundGraphQLError()
      }

      const updatedOrganization =
        await c.var.database.prismaOrganization.update({
          where: { id: organization.id },
          data: { deletedAt: new Date() },
        })

      return updatedOrganization.id
    },
  })
}
