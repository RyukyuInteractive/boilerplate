import type { MutationFieldThunk } from "@pothos/core"
import { CreateProject } from "~/application/project/create-project"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosCreateProjectInput } from "~/interface/inputs/create-project-input"
import { PothosProjectNode } from "~/interface/objects/project-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const createProject: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosProjectNode,
    description: "新しいプロジェクトを作成する",
    args: {
      input: t.arg({ type: PothosCreateProjectInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new CreateProject(c)

      const result = await service.run({
        userId: c.var.session.userId,
        name: args.input.name,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaProject.findUnique({
        where: { id: result.id },
      })
    },
  })
}
