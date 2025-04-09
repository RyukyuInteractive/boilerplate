import { TableRepository } from "../../infrastructure/repositories/cms/table.repository"

export const createTable = async (
  params: {
    name: string
    projectId: string
    createdBy: string
    updatedBy: string
  },
  tableRepository: TableRepository,
) => {
  return tableRepository.create(params)
}
