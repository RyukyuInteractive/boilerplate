import { PrismaClient } from "@prisma/client"
import { ColumnEntity, ColumnType } from "../../../domain/entities/cms/column.entity"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"
const randomUUID = () => crypto.randomUUID()

export class ColumnRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<ColumnEntity | null> {
    const column = await this.prisma.prismaColumn.findUnique({
      where: { id },
      include: {
        cells: true,
      },
    })

    if (!column) {
      return null
    }

    return new ColumnEntity({
      id: column.id,
      name: column.name,
      type: column.type as ColumnType,
      tableId: column.tableId,
      order: column.order,
      cells: column.cells.map(
        (cell) =>
          new CellEntity({
            id: cell.id,
            value: cell.value,
            columnId: cell.columnId,
            recordId: cell.recordId,
            createdAt: cell.createdAt,
            updatedAt: cell.updatedAt,
          }),
      ),
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
    })
  }

  async findByTableId(tableId: string): Promise<ColumnEntity[]> {
    const columns = await this.prisma.prismaColumn.findMany({
      where: { tableId },
      orderBy: { order: "asc" },
    })

    return columns.map(
      (column) =>
        new ColumnEntity({
          id: column.id,
          name: column.name,
          type: column.type as ColumnType,
          tableId: column.tableId,
          order: column.order,
          createdAt: column.createdAt,
          updatedAt: column.updatedAt,
        }),
    )
  }

  async create(params: {
    name: string
    type: ColumnType
    tableId: string
    order: number
  }): Promise<ColumnEntity> {
    const id = randomUUID()

    const column = await this.prisma.prismaColumn.create({
      data: {
        id,
        name: params.name,
        type: params.type,
        tableId: params.tableId,
        order: params.order,
      },
    })

    return new ColumnEntity({
      id: column.id,
      name: column.name,
      type: column.type as ColumnType,
      tableId: column.tableId,
      order: column.order,
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
    })
  }

  async update(column: ColumnEntity): Promise<ColumnEntity> {
    const updatedColumn = await this.prisma.prismaColumn.update({
      where: { id: column.id },
      data: {
        name: column.name,
        type: column.type,
        order: column.order,
        updatedAt: column.updatedAt,
      },
    })

    return new ColumnEntity({
      id: updatedColumn.id,
      name: updatedColumn.name,
      type: updatedColumn.type as ColumnType,
      tableId: updatedColumn.tableId,
      order: updatedColumn.order,
      cells: column.cells,
      createdAt: updatedColumn.createdAt,
      updatedAt: updatedColumn.updatedAt,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.prismaColumn.delete({
      where: { id },
    })
  }
}
