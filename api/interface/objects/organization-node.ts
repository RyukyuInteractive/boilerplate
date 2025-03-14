import type { PrismaOrganization } from "@prisma/client"
import { builder } from "~/interface/builder"
import { PothosOrganizationMemberNode } from "~/interface/objects/organization-member-node"
import { PothosOrganizationSettingNode } from "~/interface/objects/organization-setting-node"
import { PothosProjectNode } from "~/interface/objects/project-node"

export const PothosOrganizationNode =
  builder.objectRef<PrismaOrganization>("OrganizationNode")

builder.objectType(PothosOrganizationNode, {
  description: undefined,
})

builder.objectField(PothosOrganizationNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosOrganizationNode, "name", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosOrganizationNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosOrganizationNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosOrganizationNode, "projects", (t) => {
  return t.field({
    type: [PothosProjectNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaOrganization
        .findUniqueOrThrow({ where: { id: parent.id } })
        .projects()
    },
  })
})

builder.objectField(PothosOrganizationNode, "members", (t) => {
  return t.field({
    type: [PothosOrganizationMemberNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaOrganization
        .findUniqueOrThrow({ where: { id: parent.id } })
        .members()
    },
  })
})

builder.objectField(PothosOrganizationNode, "settings", (t) => {
  return t.field({
    type: [PothosOrganizationSettingNode],
    description: undefined,
    nullable: false,
    resolve(parent, _args, c) {
      return c.var.database.prismaOrganization
        .findUniqueOrThrow({ where: { id: parent.id } })
        .settings()
    },
  })
})
