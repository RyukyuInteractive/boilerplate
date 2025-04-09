import { type InferInput, date, object, parse, string } from "valibot"
import { CellEntity } from "./cell.entity"

const vProps = object({
  id: string(),
  tableId: string(),
  createdAt: date(),
  updatedAt: date(),
})

export type RecordEntityProps = InferInput<typeof vProps>

export class RecordEntity {
  readonly id: string
  readonly tableId: string
  readonly cells: CellEntity[]
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(props: RecordEntityProps & { cells?: CellEntity[] }) {
    const parsed = parse(vProps, props)
    this.id = parsed.id
    this.tableId = parsed.tableId
    this.cells = props.cells ?? []
    this.createdAt = parsed.createdAt
    this.updatedAt = parsed.updatedAt
  }
}
