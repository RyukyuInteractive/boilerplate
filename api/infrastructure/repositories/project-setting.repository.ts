import { ProjectSettingEntity } from "~/domain/entities/project-setting.entity"
import type { Context } from "~/env"

/**
 * プロジェクト設定
 */
export class ProjectSettingRepository {
  constructor(readonly c: Context) {}

  async write(entity: ProjectSettingEntity) {
    try {
      await this.c.var.database.prismaProjectSetting.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          projectId: entity.projectId,
          key: entity.key,
          value: entity.value,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        },
        update: {
          value: entity.value,
          updatedAt: entity.updatedAt,
        },
      })

      return null
    } catch (error) {
      console.error(error)
      return new Error("プロジェクト設定の保存に失敗しました")
    }
  }

  async read(
    projectId: string,
    key: string,
  ): Promise<ProjectSettingEntity | null> {
    try {
      const data =
        await this.c.var.database.prismaProjectSetting.findUniqueOrThrow({
          where: {
            projectId_key: {
              projectId,
              key,
            },
          },
        })

      return new ProjectSettingEntity({
        id: data.id,
        projectId: data.projectId,
        key: data.key,
        value: data.value,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
