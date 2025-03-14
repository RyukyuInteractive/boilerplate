import type { PrismaProjectSetting } from "@prisma/client"
import { builder } from "~/interface/builder"

export const PothosProjectSettingNode =
  builder.objectRef<PrismaProjectSetting>("ProjectSettingNode")

builder.objectType(PothosProjectSettingNode, {
  description: undefined,
})

builder.objectField(PothosProjectSettingNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosProjectSettingNode, "key", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.key
    },
  })
})

builder.objectField(PothosProjectSettingNode, "value", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return JSON.stringify(parent.value)
    },
  })
})

builder.objectField(PothosProjectSettingNode, "projectId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.projectId
    },
  })
})

builder.objectField(PothosProjectSettingNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosProjectSettingNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
