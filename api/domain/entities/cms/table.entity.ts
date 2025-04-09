import { type InferInput, date, object, parse, string } from "valibot"
import { ColumnEntity } from "./column.entity"
import { RecordEntity } from "./record.entity"

const vProps = object({
  id: string(),
  name: string(),
  projectId: string(),
  createdAt: date(),
  updatedAt: date(),
  createdBy: string(),
  updatedBy: string(),
})

export type TableEntityProps = InferInput<typeof vProps>

export class TableEntity {
  readonly id: string
  readonly name: string
  readonly projectId: string
  readonly columns: ColumnEntity[]
  readonly records: RecordEntity[]
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdBy: string
  readonly updatedBy: string

  constructor(props: TableEntityProps & { columns?: ColumnEntity[], records?: RecordEntity[] }) {
    const parsed = parse(vProps, props)
    this.id = parsed.id
    this.name = parsed.name
    this.projectId = parsed.projectId
    this.columns = props.columns ?? []
    this.records = props.records ?? []
    this.createdAt = parsed.createdAt
    this.updatedAt = parsed.updatedAt
    this.createdBy = parsed.createdBy
    this.updatedBy = parsed.updatedBy
  }

  update(params: {
    name?: string
    updatedBy: string
  }): TableEntity {
    return new TableEntity({
      id: this.id,
      name: params.name ?? this.name,
      projectId: this.projectId,
      columns: this.columns,
      records: this.records,
      createdAt: this.createdAt,
      updatedAt: new Date(),
      createdBy: this.createdBy,
      updatedBy: params.updatedBy,
    })
  }
}
