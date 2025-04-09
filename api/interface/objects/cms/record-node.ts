import { builder } from "../../builder"
import { RecordEntity } from "../../../domain/entities/cms/record.entity"

export const PothosRecordNode = builder.objectRef<RecordEntity>("RecordNode")

builder.objectType(PothosRecordNode, {
  description: "A record in a virtual database table",
})

builder.objectField(PothosRecordNode, "id", (t) => {
  return t.string({
    description: "The unique identifier of the record",
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosRecordNode, "tableId", (t) => {
  return t.string({
    description: "The table ID that this record belongs to",
    nullable: false,
    resolve(parent) {
      return parent.tableId
    },
  })
})

builder.objectField(PothosRecordNode, "createdAt", (t) => {
  return t.int({
    description: "The timestamp when the record was created",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosRecordNode, "updatedAt", (t) => {
  return t.int({
    description: "The timestamp when the record was last updated",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
