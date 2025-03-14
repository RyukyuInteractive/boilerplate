import type { MutationFieldThunk } from "@pothos/core"
import { CreateOrganization } from "~/application/organization/create-organization"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosCreateOrganizationInput } from "~/interface/inputs/create-organization-input"
import { PothosOrganizationNode } from "~/interface/objects/organization-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const createOrganization: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosOrganizationNode,
    description: "新しい組織を作成する",
    args: {
      input: t.arg({ type: PothosCreateOrganizationInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new CreateOrganization(c)

      const result = await service.run({
        name: args.input.name,
        nameEN: args.input.nameEN,
        userId: c.var.session.userId,
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError("組織の作成に失敗しました。")
      }

      return await c.var.database.prismaOrganization.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
