import { randomUUID } from 'crypto'
import { createPrismaClient } from './seed-helper'
import { ProjectSettingEntity } from '~/domain/entities/project-setting.entity'

// デフォルトのプロジェクト設定データ
const defaultProjectSettings = [
  {
    keyBase: 'theme',
    value: 'default',
  },
  {
    keyBase: 'visibility',
    value: 'private',
  },
  {
    keyBase: 'notification',
    value: 'enabled',
  },
]

/**
 * プロジェクト設定シードを実行する
 * すべてのプロジェクトに対してデフォルト設定を適用する
 */
export async function seedProjectSettings(): Promise<void> {
  const prisma = await createPrismaClient()

  try {
    console.log('📝 プロジェクト設定データのシードを開始します...')

    // すべてのプロジェクトを取得
    const projects = await prisma.prismaProject.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        login: true,
      },
    })

    if (projects.length === 0) {
      console.log('⚠️ プロジェクトが見つかりません。先にプロジェクトをシードしてください。')
      return
    }

    for (const project of projects) {
      console.log(`🏢 プロジェクト '${project.login}' の設定をシードします...`)

      for (const setting of defaultProjectSettings) {
        try {
          // プロジェクト固有のキーを生成
          const key = `${project.login}:${setting.keyBase}`
          
          // 既存の設定を確認
          const existingSetting = await prisma.prismaProjectSetting.findUnique({
            where: {
              projectId_key: {
                projectId: project.id,
                key: key,
              },
            },
          })

          if (!existingSetting) {
            // エンティティを作成
            const entity = new ProjectSettingEntity({
              id: randomUUID(),
              projectId: project.id,
              key: key,
              value: setting.value,
              createdAt: new Date(),
              updatedAt: new Date(),
            })

            // 設定を作成
            await prisma.prismaProjectSetting.create({
              data: {
                id: entity.id,
                projectId: entity.projectId,
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

    console.log('✨ プロジェクト設定データのシードが完了しました')
  } finally {
    await prisma.$disconnect()
  }
}