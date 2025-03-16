import type { MutationFieldThunk } from "@pothos/core"
import { UpdateProjectSetting } from "~/application/project/update-project-setting"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateProjectSettingInput } from "~/interface/inputs/update-project-setting-input"
import { PothosProjectSettingNode } from "~/interface/objects/project-setting-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const updateProjectSetting: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosProjectSettingNode,
    description: "プロジェクトの設定を更新する",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PothosUpdateProjectSettingInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateProjectSetting(c)

      const result = await service.run({
        projectId: args.id,
        key: args.input.key,
        value: args.input.value,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaProjectSetting.findUnique({
        where: { id: args.id },
      })
    },
  })
}
