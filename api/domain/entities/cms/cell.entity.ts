import { type InferInput, date, nullable, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  value: nullable(string()),
  columnId: string(),
  recordId: string(),
  createdAt: date(),
  updatedAt: date(),
})

export type CellEntityProps = InferInput<typeof vProps>

export class CellEntity {
  readonly id: string
  readonly value: string | null
  readonly columnId: string
  readonly recordId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(props: CellEntityProps) {
    const parsed = parse(vProps, props)
    this.id = parsed.id
    this.value = parsed.value
    this.columnId = parsed.columnId
    this.recordId = parsed.recordId
    this.createdAt = parsed.createdAt
    this.updatedAt = parsed.updatedAt
  }

  update(params: {
    value?: string | null
  }): CellEntity {
    return new CellEntity({
      id: this.id,
      value: params.value !== undefined ? params.value : this.value,
      columnId: this.columnId,
      recordId: this.recordId,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    })
  }
}
