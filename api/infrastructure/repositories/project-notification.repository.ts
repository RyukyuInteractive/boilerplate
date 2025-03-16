import { ProjectNotificationEntity } from "~/domain/entities/project-notification.entity"
import type { Context } from "~/env"

/**
 * プロジェクト通知
 */
export class ProjectNotificationRepository {
  constructor(readonly c: Context) {}

  async write(entity: ProjectNotificationEntity) {
    try {
      await this.c.var.database.prismaProjectNotification.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          projectId: entity.projectId,
          title: entity.title,
          message: entity.message,
          type: entity.type,
          createdAt: entity.createdAt,
          deletedAt: entity.deletedAt,
        },
        update: {
          deletedAt: entity.deletedAt,
        },
      })
      return null
    } catch (error) {
      console.error(error)
      return new Error("プロジェクト通知の保存に失敗しました")
    }
  }

  async read(id: string): Promise<ProjectNotificationEntity | null> {
    try {
      const data =
        await this.c.var.database.prismaProjectNotification.findUniqueOrThrow({
          where: { id },
        })
      return new ProjectNotificationEntity({
        id: data.id,
        projectId: data.projectId,
        title: data.title,
        message: data.message,
        type: data.type,
        createdAt: data.createdAt,
        deletedAt: data.deletedAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
