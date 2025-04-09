import { PrismaClient } from "@prisma/client"
import { RecordEntity } from "../../../domain/entities/cms/record.entity"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"
const randomUUID = () => crypto.randomUUID()

export class RecordRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<RecordEntity | null> {
    const record = await this.prisma.prismaRecord.findUnique({
      where: { id },
      include: {
        cells: true,
      },
    })

    if (!record) {
      return null
    }

    return new RecordEntity({
      id: record.id,
      tableId: record.tableId,
      cells: record.cells.map((cell) => 
        new CellEntity({
          id: cell.id,
          value: cell.value,
          columnId: cell.columnId,
          recordId: cell.recordId,
          createdAt: cell.createdAt,
          updatedAt: cell.updatedAt,
        })
      ),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    })
  }

  async findByTableId(tableId: string): Promise<RecordEntity[]> {
    const records = await this.prisma.prismaRecord.findMany({
      where: { tableId },
      include: {
        cells: true,
      },
    })

    return records.map((record) => 
      new RecordEntity({
        id: record.id,
        tableId: record.tableId,
        cells: record.cells.map((cell) => 
          new CellEntity({
            id: cell.id,
            value: cell.value,
            columnId: cell.columnId,
            recordId: cell.recordId,
            createdAt: cell.createdAt,
            updatedAt: cell.updatedAt,
          })
        ),
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      })
    )
  }

  async create(params: {
    tableId: string
  }): Promise<RecordEntity> {
    const id = randomUUID()

    const record = await this.prisma.prismaRecord.create({
      data: {
        id,
        tableId: params.tableId,
      },
    })

    return new RecordEntity({
      id: record.id,
      tableId: record.tableId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.prismaRecord.delete({
      where: { id },
    })
  }
}
