import type { PrismaProjectMember } from "@prisma/client"
import { builder } from "~/interface/builder"
import { PothosProjectNode } from "~/interface/objects/project-node"
import { PothosUserNode } from "~/interface/objects/user-node"

export const PothosProjectMemberNode =
  builder.objectRef<PrismaProjectMember>("ProjectMemberNode")

builder.objectType(PothosProjectMemberNode, {
  description: undefined,
})

builder.objectField(PothosProjectMemberNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosProjectMemberNode, "projectId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.projectId
    },
  })
})

builder.objectField(PothosProjectMemberNode, "project", (t) => {
  return t.field({
    type: PothosProjectNode,
    description: undefined,
    nullable: false,
    resolve(parent, _, c) {
      return c.var.database.prismaProjectMember
        .findUniqueOrThrow({ where: { id: parent.id } })
        .project()
    },
  })
})

builder.objectField(PothosProjectMemberNode, "userId", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.userId
    },
  })
})

builder.objectField(PothosProjectMemberNode, "user", (t) => {
  return t.field({
    type: PothosUserNode,
    description: undefined,
    nullable: false,
    resolve(parent, _, c) {
      return c.var.database.prismaProjectMember
        .findUniqueOrThrow({ where: { id: parent.id } })
        .user()
    },
  })
})

builder.objectField(PothosProjectMemberNode, "role", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.role
    },
  })
})

builder.objectField(PothosProjectMemberNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})
