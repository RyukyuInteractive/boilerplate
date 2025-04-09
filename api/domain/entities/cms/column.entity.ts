import { type InferInput, date, number, object, parse, string, union, literal } from "valibot"
import { CellEntity } from "./cell.entity"

const vProps = object({
  id: string(),
  name: string(),
  type: union([
    literal("text"),
    literal("number"),
    literal("date"),
    literal("boolean"),
    literal("select"),
  ]),
  tableId: string(),
  order: number(),
  createdAt: date(),
  updatedAt: date(),
})

export type ColumnType = "text" | "number" | "date" | "boolean" | "select"
export type ColumnEntityProps = InferInput<typeof vProps>

export class ColumnEntity {
  readonly id: string
  readonly name: string
  readonly type: ColumnType
  readonly tableId: string
  readonly order: number
  readonly cells: CellEntity[]
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(props: ColumnEntityProps & { cells?: CellEntity[] }) {
    const parsed = parse(vProps, props)
    this.id = parsed.id
    this.name = parsed.name
    this.type = parsed.type as ColumnType
    this.tableId = parsed.tableId
    this.order = parsed.order
    this.cells = props.cells ?? []
    this.createdAt = parsed.createdAt
    this.updatedAt = parsed.updatedAt
  }

  update(params: {
    name?: string
    type?: ColumnType
    order?: number
  }): ColumnEntity {
    return new ColumnEntity({
      id: this.id,
      name: params.name ?? this.name,
      type: params.type ?? this.type,
      tableId: this.tableId,
      order: params.order ?? this.order,
      cells: this.cells,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    })
  }
}
