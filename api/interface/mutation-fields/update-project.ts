import type { MutationFieldThunk } from "@pothos/core"
import { UpdateProject } from "~/application/project/update-project"
import { InvalidArgumentGraphQLError } from "~/interface/errors/invalid-argument-graphql-error"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosUpdateProjectInput } from "~/interface/inputs/update-project-input"
import { PothosProjectNode } from "~/interface/objects/project-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const updateProject: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosProjectNode,
    description: "プロジェクトを更新する",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: PothosUpdateProjectInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new UpdateProject(c)

      const result = await service.run({
        projectId: args.id,
        name: args.input.name,
      })

      if (result instanceof Error) {
        throw new InvalidArgumentGraphQLError(
          "プロジェクトの更新に失敗しました。",
        )
      }

      return await c.var.database.prismaProject.findUnique({
        where: { id: result.id },
      })
    },
  })
}
