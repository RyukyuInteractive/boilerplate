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
      console.error(error)
      return new Error()
    }
  }

  async read(
    organizationId: string,
    userId: string,
  ): Promise<OrganizationMemberEntity | null> {
    try {
      const data =
        await this.c.var.database.prismaOrganizationMember.findUniqueOrThrow({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
        })

      return new OrganizationMemberEntity({
        id: data.id,
        organizationId: data.organizationId,
        userId: data.userId,
        role: data.role,
        createdAt: data.createdAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
