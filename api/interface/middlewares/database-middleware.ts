import { PrismaClient } from "@prisma/client"
import { factory } from "~/interface/factory"

/**
 * c.var.databaseにprismaClientを設定する
 */
export const databaseMiddleware = factory.createMiddleware((c, next) => {
  const prisma = new PrismaClient()

  c.set("database", prisma)

  return next()
})
