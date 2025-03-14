import type { Context } from "~/env"
import { OrganizationEntity } from "~/domain/entities/organization.entity"

export class OrganizationRepository {
  constructor(readonly c: Context) {}

  async write(organization: OrganizationEntity) {
    try {
      await this.c.var.database.prismaOrganization.upsert({
        where: { id: organization.id },
        update: {
          login: organization.login,
          name: organization.name,
          updatedAt: organization.updatedAt,
        },
        create: {
          id: organization.id,
          login: organization.login,
          name: organization.name,
          createdAt: organization.createdAt,
          updatedAt: organization.updatedAt,
        },
      })
    } catch (e) {
      if (e instanceof Error) {
        return e
      }
      return new Error()
    }
  }

  async read(id: string): Promise<OrganizationEntity | null> {
    const organization =
      await this.c.var.database.prismaOrganization.findUnique({
        where: { id },
      })

    if (!organization) {
      return null
    }

    return new OrganizationEntity({
      id: organization.id,
      login: organization.login,
      name: organization.name,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    })
  }
}
