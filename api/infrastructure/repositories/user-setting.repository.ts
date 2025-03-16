import { UserSettingEntity } from "~/domain/entities/user-setting.entity"
import type { Context } from "~/env"

/**
 * ユーザー設定
 */
export class UserSettingRepository {
  constructor(readonly c: Context) {}

  async write(entity: UserSettingEntity) {
    try {
      await this.c.var.database.prismaUserSetting.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          userId: entity.userId,
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
      return new Error()
    }
  }

  async read(userId: string, key: string): Promise<UserSettingEntity | null> {
    try {
      const setting = await this.c.var.database.prismaUserSetting.findUnique({
        where: {
          userId_key: {
            userId,
            key,
          },
        },
      })

      if (setting === null) {
        return null
      }

      return new UserSettingEntity({
        id: setting.id,
        userId: setting.userId,
        key: setting.key,
        value: setting.value,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
