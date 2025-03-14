import type { PrismaUserSetting } from "@prisma/client"
import { builder } from "~/interface/builder"

export const PothosUserSettingNode =
  builder.objectRef<PrismaUserSetting>("UserSettingNode")

builder.objectType(PothosUserSettingNode, {
  description: undefined,
})

builder.objectField(PothosUserSettingNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosUserSettingNode, "key", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.key
    },
  })
})

builder.objectField(PothosUserSettingNode, "value", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return JSON.stringify(parent.value)
    },
  })
})

builder.objectField(PothosUserSettingNode, "userId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.userId
    },
  })
})

builder.objectField(PothosUserSettingNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosUserSettingNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
