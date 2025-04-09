import { builder } from "../../builder"
import { TableEntity } from "../../../domain/entities/cms/table.entity"
import { ColumnEntity } from "../../../domain/entities/cms/column.entity"
import { RecordEntity } from "../../../domain/entities/cms/record.entity"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"

export const PothosTableNode = builder.objectRef<TableEntity>("TableNode")

builder.objectType(PothosTableNode, {
  description: "A virtual database table",
})

builder.objectField(PothosTableNode, "id", (t) => {
  return t.string({
    description: "The unique identifier of the table",
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosTableNode, "name", (t) => {
  return t.string({
    description: "The name of the table",
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosTableNode, "projectId", (t) => {
  return t.string({
    description: "The project ID that this table belongs to",
    nullable: false,
    resolve(parent) {
      return parent.projectId
    },
  })
})

builder.objectField(PothosTableNode, "createdAt", (t) => {
  return t.int({
    description: "The timestamp when the table was created",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosTableNode, "updatedAt", (t) => {
  return t.int({
    description: "The timestamp when the table was last updated",
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosTableNode, "createdBy", (t) => {
  return t.string({
    description: "The user ID who created the table",
    nullable: false,
    resolve(parent) {
      return parent.createdBy
    },
  })
})

builder.objectField(PothosTableNode, "updatedBy", (t) => {
  return t.string({
    description: "The user ID who last updated the table",
    nullable: false,
    resolve(parent) {
      return parent.updatedBy
    },
  })
})
