import { HTTPException } from "hono/http-exception"
import { OrganizationMemberEntity } from "~/domain/entities/organization-member.entity"
import type { Context } from "~/env"

export class OrganizationMemberRepository {
  constructor(readonly c: Context) {}

  async write(entity: OrganizationMemberEntity) {
    try {
      await this.c.var.database.prismaOrganizationMember.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          organizationId: entity.organizationId,
          userId: entity.userId,
          role: entity.role,
          createdAt: entity.createdAt,
        },
        update: {
          organizationId: entity.organizationId,
          userId: entity.userId,
          role: entity.role,
        },
      })

      return null
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, error)
      }
      return new HTTPException(500, {
        message: "メンバーの保存に失敗しました。",
      })
    }
  }

  async read(id: string): Promise<OrganizationMemberEntity> {
    const member =
      await this.c.var.database.prismaOrganizationMember.findUnique({
        where: { id },
      })

    if (!member) {
      throw new Error("メンバーが見つかりません。")
    }

    return new OrganizationMemberEntity({
      id: member.id,
      organizationId: member.organizationId,
      userId: member.userId,
      role: member.role,
      createdAt: member.createdAt,
    })
  }
}
