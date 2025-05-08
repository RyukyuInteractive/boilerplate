import { randomUUID } from 'crypto'
import { createPrismaClient } from './seed-helper'
import { UserSettingEntity } from '~/domain/entities/user-setting.entity'

// デフォルトのユーザー設定データ
const defaultUserSettings = [
  {
    keyBase: 'theme',
    value: 'light',
  },
  {
    keyBase: 'language',
    value: 'ja',
  },
  {
    keyBase: 'notifications',
    value: 'enabled',
  },
]

/**
 * ユーザー設定シードを実行する
 * すべてのユーザーに対してデフォルト設定を適用する
 */
export async function seedUserSettings(): Promise<void> {
  const prisma = await createPrismaClient()

  try {
    console.log('📝 ユーザー設定データのシードを開始します...')

    // すべてのユーザーを取得
    const users = await prisma.prismaUser.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        login: true,
      },
    })

    if (users.length === 0) {
      console.log('⚠️ ユーザーが見つかりません。先にユーザーをシードしてください。')
      return
    }

    for (const user of users) {
      console.log(`👤 ユーザー '${user.login}' の設定をシードします...`)

      for (const setting of defaultUserSettings) {
        try {
          // ユーザー固有のキーを生成
          const key = `${user.login}:${setting.keyBase}`
          
          // 既存の設定を確認
          const existingSetting = await prisma.prismaUserSetting.findUnique({
            where: {
              userId_key: {
                userId: user.id,
                key: key,
              },
            },
          })

          if (!existingSetting) {
            // エンティティを作成
            const entity = new UserSettingEntity({
              id: randomUUID(),
              userId: user.id,
              key: key,
              value: setting.value,
              createdAt: new Date(),
              updatedAt: new Date(),
            })

            // 設定を作成
            await prisma.prismaUserSetting.create({
              data: {
                id: entity.id,
                userId: entity.userId,
                key: entity.key,
                value: entity.value,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
              },
            })
            console.log(`✅ 設定 '${setting.keyBase}' を作成しました`)
          } else {
            console.log(`⚠️ 設定 '${setting.keyBase}' は既に存在します`)
          }
        } catch (error) {
          console.error(`❌ 設定 '${setting.keyBase}' の作成に失敗しました:`, (error as Error).message)
        }
      }
    }

    console.log('✨ ユーザー設定データのシードが完了しました')
  } finally {
    await prisma.$disconnect()
  }
}