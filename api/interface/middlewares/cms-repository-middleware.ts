import { factory } from "../factory"
import { TableRepository } from "../../infrastructure/repositories/cms/table.repository"
import { ColumnRepository } from "../../infrastructure/repositories/cms/column.repository"
import { RecordRepository } from "../../infrastructure/repositories/cms/record.repository"
import { CellRepository } from "../../infrastructure/repositories/cms/cell.repository"

/**
 * CMS repositories middleware
 */
export const cmsRepositoryMiddleware = factory.createMiddleware((c, next) => {
  const prisma = c.get("database")
  
  const tableRepository = new TableRepository(prisma)
  const columnRepository = new ColumnRepository(prisma)
  const recordRepository = new RecordRepository(prisma)
  const cellRepository = new CellRepository(prisma)
  
  c.set("tableRepository", tableRepository)
  c.set("columnRepository", columnRepository)
  c.set("recordRepository", recordRepository)
  c.set("cellRepository", cellRepository)
  
  return next()
})
