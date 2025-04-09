import { PrismaClient } from "@prisma/client"
import { TableEntity } from "../../../domain/entities/cms/table.entity"
import { ColumnEntity } from "../../../domain/entities/cms/column.entity"
import { RecordEntity } from "../../../domain/entities/cms/record.entity"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"
const randomUUID = () => crypto.randomUUID()

export class TableRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<TableEntity | null> {
    const table = await this.prisma.prismaTable.findUnique({
      where: { id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: { cells: true },
        },
        records: {
          include: { cells: true },
        },
      },
    })

    if (!table) {
      return null
    }

    const columns = table.columns.map(
      (column) =>
        new ColumnEntity({
          id: column.id,
          name: column.name,
          type: column.type as any,
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
        }),
    )

    const records = table.records.map(
      (record) =>
        new RecordEntity({
          id: record.id,
          tableId: record.tableId,
          cells: record.cells.map(
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
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        }),
    )

    return new TableEntity({
      id: table.id,
      name: table.name,
      projectId: table.projectId,
      columns,
      records,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      createdBy: table.createdBy,
      updatedBy: table.updatedBy,
    })
  }

  async findByProjectId(projectId: string): Promise<TableEntity[]> {
    const tables = await this.prisma.prismaTable.findMany({
      where: { projectId },
      include: {
        columns: {
          orderBy: { order: "asc" },
        },
        records: true,
      },
    })

    return tables.map(
      (table) =>
        new TableEntity({
          id: table.id,
          name: table.name,
          projectId: table.projectId,
          columns: table.columns.map(
            (column) =>
              new ColumnEntity({
                id: column.id,
                name: column.name,
                type: column.type as any,
                tableId: column.tableId,
                order: column.order,
                createdAt: column.createdAt,
                updatedAt: column.updatedAt,
              }),
          ),
          records: table.records.map(
            (record) =>
              new RecordEntity({
                id: record.id,
                tableId: record.tableId,
                createdAt: record.createdAt,
                updatedAt: record.updatedAt,
              }),
          ),
          createdAt: table.createdAt,
          updatedAt: table.updatedAt,
          createdBy: table.createdBy,
          updatedBy: table.updatedBy,
        }),
    )
  }

  async create(params: {
    name: string
    projectId: string
    createdBy: string
    updatedBy: string
  }): Promise<TableEntity> {
    const id = randomUUID()

    const table = await this.prisma.prismaTable.create({
      data: {
        id,
        name: params.name,
        projectId: params.projectId,
        createdBy: params.createdBy,
        updatedBy: params.updatedBy,
      },
    })

    return new TableEntity({
      id: table.id,
      name: table.name,
      projectId: table.projectId,
      columns: [],
      records: [],
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      createdBy: table.createdBy,
      updatedBy: table.updatedBy,
    })
  }

  async update(table: TableEntity): Promise<TableEntity> {
    const updatedTable = await this.prisma.prismaTable.update({
      where: { id: table.id },
      data: {
        name: table.name,
        updatedBy: table.updatedBy,
        updatedAt: table.updatedAt,
      },
    })

    return new TableEntity({
      id: updatedTable.id,
      name: updatedTable.name,
      projectId: updatedTable.projectId,
      columns: table.columns,
      records: table.records,
      createdAt: updatedTable.createdAt,
      updatedAt: updatedTable.updatedAt,
      createdBy: updatedTable.createdBy,
      updatedBy: updatedTable.updatedBy,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.prismaTable.delete({
      where: { id },
    })
  }
}
