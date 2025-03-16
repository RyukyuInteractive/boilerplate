import type { MutationFieldThunk } from "@pothos/core"
import { CreateProjectMember } from "~/application/project/create-project-member"
import { UnauthenticatedGraphQLError } from "~/interface/errors/unauthenticated-graphql-error"
import { PothosProjectMemberInput } from "~/interface/inputs/create-project-member-input"
import { PothosProjectMemberNode } from "~/interface/objects/project-member-node"
import type { SchemaTypes } from "~/interface/types/schema-types"

export const createProjectMember: MutationFieldThunk<SchemaTypes> = (t) => {
  return t.field({
    type: PothosProjectMemberNode,
    description: "プロジェクトのメンバーを作成する",
    args: {
      input: t.arg({ type: PothosProjectMemberInput, required: true }),
    },
    async resolve(_, args, c) {
      if (c.var.session === null) {
        throw new UnauthenticatedGraphQLError()
      }

      const service = new CreateProjectMember(c)

      const result = await service.run({
        projectId: args.input.projectId,
        userId: args.input.userId,
        role: args.input.role as never,
      })

      if (result instanceof Error) {
        throw result
      }

      return await c.var.database.prismaProjectMember.findUnique({
        where: { id: result.id },
      })
    },
  })
}
