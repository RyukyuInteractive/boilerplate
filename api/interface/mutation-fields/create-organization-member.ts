import type { MutationFieldThunk } from "@pothos/core"
import { CreateOrganizationMember } from "~/application/organization/create-organization-member"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosOrganizationMemberInput } from "~/interface/inputs/create-organization-member-input"
import { PothosOrganizationMemberNode } from "~/interface/objects/organization-member-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const createOrganizationMember: MutationFieldThunk<SchemaTypes> = (
  t,
) => {
  return t.field({
    type: PothosOrganizationMemberNode,
    description: "組織のメンバーを作成する",
    args: {
      input: t.arg({ type: PothosOrganizationMemberInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new CreateOrganizationMember(c)

      const result = await service.run({
        organizationId: args.input.organizationId,
        userId: args.input.userId,
        role: args.input.role as "ADMIN" | "MEMBER",
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError("メンバーの作成に失敗しました。")
      }

      return await c.var.database.prismaOrganizationMember.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
