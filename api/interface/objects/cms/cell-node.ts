import { builder } from "../../builder"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"

export const PothosCellNode = builder.objectRef<CellEntity>("CellNode")

builder.objectType(PothosCellNode, {
  description: "A cell in a virtual database table",
})

builder.objectField(PothosCellNode, "id", (t) => {
  return t.string({
    description: "The unique identifier of the cell",
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosCellNode, "value", (t) => {
  return t.string({
    description: "The value of the cell",
    nullable: true,
    resolve(parent) {
      return parent.value
    },
  })
})

builder.objectField(PothosCellNode, "columnId", (t) => {
  return t.string({
    description: "The column ID that this cell belongs to",
    nullable: false,
    resolve(parent) {
      return parent.columnId
    },
  })
})

builder.objectField(PothosCellNode, "recordId", (t) => {
  return t.string({
    description: "The record ID that this cell belongs to",
    nullable: false,
    resolve(parent) {
      return parent.recordId
    },
  })
})

builder.objectField(PothosCellNode, "createdAt", (t) => {
  return t.int({
    description: "The timestamp when the cell was created",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosCellNode, "updatedAt", (t) => {
  return t.int({
    description: "The timestamp when the cell was last updated",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
