import { OrganizationEntity } from "~/domain/entities/organization.entity"
import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"

export class OrganizationRepository {
  constructor(readonly c: Context) {}

  async write(entity: OrganizationEntity) {
    try {
      await this.c.var.database.prismaOrganization.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          login: entity.login,
          name: entity.name.value,
          createdAt: entity.createdAt,
          deletedAt: entity.deletedAt,
        },
        update: {
          name: entity.name.value,
          deletedAt: entity.deletedAt,
          updatedAt: entity.updatedAt,
        },
      })

      return null
    } catch (error) {
      console.error(error)
      return new Error()
    }
  }

  async read(id: string): Promise<OrganizationEntity | null> {
    try {
      const data =
        await this.c.var.database.prismaOrganization.findUniqueOrThrow({
          where: { id },
        })

      return new OrganizationEntity({
        id: data.id,
        login: data.login,
        name: new NameValue(data.name),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
