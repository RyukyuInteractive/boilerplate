import { builder } from "../../builder"
import { PothosTableNode } from "../../objects/cms/table-node"

builder.mutationField("createTable", (t) =>
  t.field({
    type: PothosTableNode,
    args: {
      name: t.arg.string({ required: true }),
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const { name, projectId } = args
      const userId = ctx.var.session?.userId || "system"
      const tableRepository = ctx.var.tableRepository

      return tableRepository.create({
        name,
        projectId,
        createdBy: userId,
        updatedBy: userId,
      })
    },
  }),
)
