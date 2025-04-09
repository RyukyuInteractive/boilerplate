import { builder } from "../../builder"
import { PothosRecordNode } from "../../objects/cms/record-node"

builder.mutationField("createRecord", (t) =>
  t.field({
    type: PothosRecordNode,
    args: {
      tableId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const { tableId } = args
      const recordRepository = ctx.var.recordRepository

      return recordRepository.create({
        tableId,
      })
    },
  }),
)
