import { builder } from "../../builder"
import { ColumnEntity, ColumnType } from "../../../domain/entities/cms/column.entity"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"

export const PothosColumnNode = builder.objectRef<ColumnEntity>("ColumnNode")

builder.objectType(PothosColumnNode, {
  description: "A column in a virtual database table",
})

builder.objectField(PothosColumnNode, "id", (t) => {
  return t.string({
    description: "The unique identifier of the column",
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosColumnNode, "name", (t) => {
  return t.string({
    description: "The name of the column",
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosColumnNode, "type", (t) => {
  return t.string({
    description: "The data type of the column",
    nullable: false,
    resolve(parent) {
      return parent.type
    },
  })
})

builder.objectField(PothosColumnNode, "tableId", (t) => {
  return t.string({
    description: "The table ID that this column belongs to",
    nullable: false,
    resolve(parent) {
      return parent.tableId
    },
  })
})

builder.objectField(PothosColumnNode, "order", (t) => {
  return t.int({
    description: "The order of the column in the table",
    nullable: false,
    resolve(parent) {
      return parent.order
    },
  })
})

builder.objectField(PothosColumnNode, "createdAt", (t) => {
  return t.int({
    description: "The timestamp when the column was created",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosColumnNode, "updatedAt", (t) => {
  return t.int({
    description: "The timestamp when the column was last updated",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
