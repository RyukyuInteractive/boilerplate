import { builder } from "~/interface/builder"
import { PothosProjectMemberNode } from "~/interface/objects/project-member-node"
import { PothosUserSettingNode } from "~/interface/objects/user-setting"

interface PrismaUser {
  id: string;
  email: string;
  name: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const PothosUserNode = builder.objectRef<PrismaUser>("UserNode")

builder.objectType(PothosUserNode, {
  description: undefined,
})

builder.objectField(PothosUserNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosUserNode, "email", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.email
    },
  })
})

builder.objectField(PothosUserNode, "name", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosUserNode, "isDeleted", (t) => {
  return t.boolean({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.deletedAt !== null
    },
  })
})

builder.objectField(PothosUserNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosUserNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosUserNode, "settings", (t) => {
  return t.field({
    type: [PothosUserSettingNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaUser
        .findUniqueOrThrow({ where: { id: parent.id } })
        .settings()
    },
  })
})

builder.objectField(PothosUserNode, "projectMembers", (t) => {
  return t.field({
    type: [PothosProjectMemberNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaUser
        .findUniqueOrThrow({ where: { id: parent.id } })
        .projectMembers()
    },
  })
})
