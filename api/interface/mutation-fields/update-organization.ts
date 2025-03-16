import type { MutationFieldThunk } from "@pothos/core"
import { UpdateOrganization } from "~/application/organization/update-organization"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateOrganizationInput } from "~/interface/inputs/update-organization-input"
import { PothosOrganizationNode } from "~/interface/objects/organization-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const updateOrganization: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosOrganizationNode,
    description: "組織を更新する",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PothosUpdateOrganizationInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateOrganization(c)

      const result = await service.run({
        id: args.id,
        name: args.input.name,
        description: args.input.description,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaOrganization.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
