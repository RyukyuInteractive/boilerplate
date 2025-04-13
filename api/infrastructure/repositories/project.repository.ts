import { ProjectEntity } from "~/domain/entities/project.entity"
import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"

export class ProjectRepository {
  constructor(readonly c: Context) {}

  async write(entity: ProjectEntity) {
    try {
      await this.c.var.database.prismaProject.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          login: entity.login,
          name: entity.name.value,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          deletedAt: entity.deletedAt,
        },
        update: {
          login: entity.login,
          name: entity.name.value,
          updatedAt: entity.updatedAt,
          deletedAt: entity.deletedAt,
        },
      })

      return null
    } catch (error) {
      console.error(error)
      return new Error()
    }
  }

  async read(id: string): Promise<ProjectEntity | null> {
    try {
      const data = await this.c.var.database.prismaProject.findUniqueOrThrow({
        where: { id },
      })

      return new ProjectEntity({
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
