import type { MutationFieldThunk } from "@pothos/core"
import { DeleteOrganizationMember } from "~/application/organization/delete-organization-member"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const deleteOrganizationMember: MutationFieldThunk<SchemaTypes> = (
  t,
) => {
  return t.field({
    type: "ID",
    description: "組織メンバーを削除する",
    args: {
      organizationMemberId: t.arg.string({ required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new DeleteOrganizationMember(c)

      const result = await service.run({
        organizationMemberId: args.organizationMemberId,
      })

      if (result instanceof Error) {
        if (result.status === 404) {
          throw new NotFoundGraphQLError()
        }
        throw new InvalidArgumentGraphQLError(
          "組織メンバーの削除に失敗しました。",
        )
      }

      return result.id
    },
  })
}
