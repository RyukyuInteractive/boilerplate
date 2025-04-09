import { builder } from "../../builder"
import { PothosColumnNode } from "../../objects/cms/column-node"

builder.mutationField("createColumn", (t) =>
  t.field({
    type: PothosColumnNode,
    args: {
      name: t.arg.string({ required: true }),
      type: t.arg.string({ required: true }),
      tableId: t.arg.string({ required: true }),
      order: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const { name, type, tableId, order } = args
      const columnRepository = ctx.var.columnRepository

      return columnRepository.create({
        name,
        type: type as any,
        tableId,
        order,
      })
    },
  }),
)
