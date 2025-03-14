import type { MutationFieldThunk } from "@pothos/core"
import { UpdateOrganizationSetting } from "~/application/organization/update-organization-setting"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateOrganizationSettingInput } from "~/interface/inputs/update-organization-setting-input"
import { PothosOrganizationSettingNode } from "~/interface/objects/organization-setting-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const updateOrganizationSetting: MutationFieldThunk<SchemaTypes> = (
  t,
) => {
  return t.field({
    type: PothosOrganizationSettingNode,
    description: "組織の設定を更新する",
    args: {
      organizationId: t.arg.string({ required: true }),
      input: t.arg({
        type: PothosUpdateOrganizationSettingInput,
        required: true,
      }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateOrganizationSetting(c)

      const result = await service.run({
        organizationId: args.organizationId,
        key: args.input.key,
        value: args.input.value,
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError("組織設定の更新に失敗しました。")
      }

      return await c.var.database.prismaOrganizationSetting.findUnique({
        where: { id: result.id },
      })
    },
  })
}
