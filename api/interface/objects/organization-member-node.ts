import type { PrismaOrganizationMember } from "@prisma/client"
import { builder } from "~/interface/builder"
import { PothosOrganizationNode } from "~/interface/objects/organization-node"
import { PothosUserNode } from "~/interface/objects/user-node"

export const PothosOrganizationMemberNode =
  builder.objectRef<PrismaOrganizationMember>("OrganizationMemberNode")

builder.objectType(PothosOrganizationMemberNode, {
  description: undefined,
})

builder.objectField(PothosOrganizationMemberNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "organizationId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.organizationId
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "organization", (t) => {
  return t.field({
    type: PothosOrganizationNode,
    description: undefined,
    nullable: false,
    resolve(parent, _, c) {
      return c.var.database.prismaOrganizationMember
        .findUniqueOrThrow({ where: { id: parent.id } })
        .organization()
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "userId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.userId
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "user", (t) => {
  return t.field({
    type: PothosUserNode,
    description: undefined,
    nullable: false,
    resolve(parent, _, c) {
      return c.var.database.prismaOrganizationMember
        .findUniqueOrThrow({ where: { id: parent.id } })
        .user()
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "role", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.role
    },
  })
})

builder.objectField(PothosOrganizationMemberNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})
