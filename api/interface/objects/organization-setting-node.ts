import type { PrismaOrganizationSetting } from "@prisma/client"
import { builder } from "~/interface/builder"

export const PothosOrganizationSettingNode =
  builder.objectRef<PrismaOrganizationSetting>("OrganizationSettingNode")

builder.objectType(PothosOrganizationSettingNode, {
  description: undefined,
})

builder.objectField(PothosOrganizationSettingNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosOrganizationSettingNode, "key", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.key
    },
  })
})

builder.objectField(PothosOrganizationSettingNode, "value", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.value
    },
  })
})

builder.objectField(PothosOrganizationSettingNode, "organizationId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.organizationId
    },
  })
})

builder.objectField(PothosOrganizationSettingNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosOrganizationSettingNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})
