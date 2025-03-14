import type { MutationFieldThunk } from "@pothos/core"
import type { PrismaUser } from "@prisma/client"
import { CreateUser } from "application/user/create-user"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { PothosCreateUserInput } from "~/interface/inputs/create-user-input"
import { PothosUserNode } from "~/interface/objects/user-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const createUser: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserNode,
    description: "新しいユーザーを作成する",
    args: {
      input: t.arg({ type: PothosCreateUserInput, required: true }),
    },
    async resolve(_, args, c): Promise<PrismaUser> {
      const service = new CreateUser(c)

      const result = await service.run({
        email: args.input.email,
        password: args.input.password,
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError("アカウント作成に失敗しました。")
      }

      return await c.var.database.prismaUser.findUniqueOrThrow({
        where: { id: result.id },
      })
    },
  })
}
