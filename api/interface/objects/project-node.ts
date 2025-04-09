import { builder } from "~/interface/builder"
import { PothosProjectMemberNode } from "~/interface/objects/project-member-node"
import { PothosProjectSettingNode } from "~/interface/objects/project-setting-node"

interface PrismaProject {
  id: string;
  name: string;
  organizationId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const PothosProjectNode = builder.objectRef<PrismaProject>("ProjectNode")

builder.objectType(PothosProjectNode, {
  description: undefined,
})

builder.objectField(PothosProjectNode, "id", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.id
    },
  })
})

builder.objectField(PothosProjectNode, "name", (t) => {
  return t.string({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return parent.name
    },
  })
})

builder.objectField(PothosProjectNode, "organizationId", (t) => {
  return t.string({
    description: undefined,
    nullable: true,
    resolve(parent) {
      return parent.organizationId
    },
  })
})

builder.objectField(PothosProjectNode, "createdAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.createdAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosProjectNode, "updatedAt", (t) => {
  return t.int({
    description: undefined,
    nullable: false,
    resolve(parent) {
      return Math.floor(parent.updatedAt.getTime() / 1000)
    },
  })
})

builder.objectField(PothosProjectNode, "settings", (t) => {
  return t.field({
    type: [PothosProjectSettingNode],
    description: undefined,
    nullable: true,
    resolve(parent, _, c) {
      return c.var.database.prismaProject
        .findUniqueOrThrow({ where: { id: parent.id } })
        .settings()
    },
  })
})

builder.objectField(PothosProjectNode, "members", (t) => {
  return t.field({
    type: [PothosProjectMemberNode],
    description: undefined,
    nullable: false,
    args: {
      offset: t.arg({ type: "Int", required: true }),
      limit: t.arg({ type: "Int", required: true }),
    },
    resolve(parent, _args, c) {
      return c.var.database.prismaProject
        .findUniqueOrThrow({ where: { id: parent.id } })
        .members()
    },
  })
})
