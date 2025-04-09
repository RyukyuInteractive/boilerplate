import { builder } from "../../builder"
import { PothosCellNode } from "../../objects/cms/cell-node"

builder.mutationField("updateCell", (t) =>
  t.field({
    type: PothosCellNode,
    args: {
      id: t.arg.string({ required: true }),
      value: t.arg.string(),
    },
    resolve: async (_, args, ctx) => {
      const { id, value } = args
      const cellRepository = ctx.var.cellRepository

      const cell = await cellRepository.findById(id)
      if (!cell) {
        throw new Error(`Cell with id ${id} not found`)
      }

      cell.setValue(value)
      return cellRepository.update(cell)
    },
  }),
)
