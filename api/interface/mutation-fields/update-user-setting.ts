import type { MutationFieldThunk } from "@pothos/core"
import { UpdateUserSetting } from "~/application/user/update-user-setting"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateUserSettingInput } from "~/interface/inputs/update-user-setting-input"
import { PothosUserSettingNode } from "~/interface/objects/user-setting"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const updateUserSetting: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosUserSettingNode,
    description: "ユーザーの設定を更新する",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PothosUpdateUserSettingInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateUserSetting(c)

      const result = await service.run({
        userId: args.id,
        key: args.input.key,
        value: args.input.value,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaUserSetting.findUniqueOrThrow({
        where: { id: args.id },
      })
    },
  })
}
