import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"
import { factory } from "~/interface/factory"

/**
 * c.var.databaseにprismaClientを設定する
 */
export const databaseMiddleware = factory.createMiddleware((c, next) => {
  const adapter = new PrismaD1(c.env.DB)

  const prisma = new PrismaClient({ adapter })

  c.set("database", prisma)

  return next()
})
