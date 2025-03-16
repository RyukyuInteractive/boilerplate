import type { MutationFieldThunk } from "@pothos/core"
import { DeleteProject } from "~/application/project/delete-project"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const deleteProject: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: "ID",
    description: "プロジェクトを削除する",
    args: {
      id: t.arg.string({ required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new DeleteProject(c)

      const result = await service.run({
        projectId: args.id,
      })

      if (result instanceof Error) {
        throw result
      }

      return result.id
    },
  })
}
