import { builder } from "../../builder"
import { PothosTableNode } from "../../objects/cms/table-node"

builder.queryField("tables", (t) =>
  t.field({
    type: [PothosTableNode],
    args: {
      projectId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const { projectId } = args
      const tableRepository = ctx.var.tableRepository
      return tableRepository.findByProjectId(projectId)
    },
  }),
)

builder.queryField("table", (t) =>
  t.field({
    type: PothosTableNode,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const { id } = args
      const tableRepository = ctx.var.tableRepository
      return tableRepository.findById(id)
    },
  }),
)
