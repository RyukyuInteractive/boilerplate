import { PrismaClient } from "@prisma/client"
import { CellEntity } from "../../../domain/entities/cms/cell.entity"

const randomUUID = () => crypto.randomUUID()

export class CellRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<CellEntity | null> {
    const cell = await this.prisma.prismaCell.findUnique({
      where: { id },
    })

    if (!cell) {
      return null
    }

    return new CellEntity({
      id: cell.id,
      value: cell.value,
      columnId: cell.columnId,
      recordId: cell.recordId,
      createdAt: cell.createdAt,
      updatedAt: cell.updatedAt,
    })
  }

  async findByColumnIdAndRecordId(columnId: string, recordId: string): Promise<CellEntity | null> {
    const cell = await this.prisma.prismaCell.findUnique({
      where: {
        columnId_recordId: {
          columnId,
          recordId,
        },
      },
    })

    if (!cell) {
      return null
    }

    return new CellEntity({
      id: cell.id,
      value: cell.value,
      columnId: cell.columnId,
      recordId: cell.recordId,
      createdAt: cell.createdAt,
      updatedAt: cell.updatedAt,
    })
  }

  async create(params: {
    value: string | null
    columnId: string
    recordId: string
  }): Promise<CellEntity> {
    const id = randomUUID()

    const cell = await this.prisma.prismaCell.create({
      data: {
        id,
        value: params.value,
        columnId: params.columnId,
        recordId: params.recordId,
      },
    })

    return new CellEntity({
      id: cell.id,
      value: cell.value,
      columnId: cell.columnId,
      recordId: cell.recordId,
      createdAt: cell.createdAt,
      updatedAt: cell.updatedAt,
    })
  }

  async update(cell: CellEntity): Promise<CellEntity> {
    const updatedCell = await this.prisma.prismaCell.update({
      where: { id: cell.id },
      data: {
        value: cell.value,
        updatedAt: cell.updatedAt,
      },
    })

    return new CellEntity({
      id: updatedCell.id,
      value: updatedCell.value,
      columnId: updatedCell.columnId,
      recordId: updatedCell.recordId,
      createdAt: updatedCell.createdAt,
      updatedAt: updatedCell.updatedAt,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.prismaCell.delete({
      where: { id },
    })
  }
}
