import type { MutationFieldThunk } from "@pothos/core"
import { UpdateUser } from "~/application/user/update-user"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateUserInput } from "~/interface/inputs/update-user-input"
import { PothosUserNode } from "~/interface/objects/user-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

/**
 * ユーザー情報を更新する
 */
export const updateUser: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserNode,
    description: "ユーザー情報を更新する",
    args: {
      id: t.arg.id({ required: true }),
      input: t.arg({ type: PothosUpdateUserInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateUser(c)

      const result = await service.run({
        id: args.id,
        name: args.input.name,
        email: args.input.email,
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError(
          "ユーザー情報の更新に失敗しました。",
        )
      }

      return await c.var.database.prismaUser.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
