import { createPrismaClient } from './seed-helper'
import { ProjectEntity } from '~/domain/entities/project.entity'
import { NameValue } from '~/domain/values/name.value'
import { randomUUID } from 'crypto'

// シードするプロジェクトデータ
const projects = [
  {
    login: 'main-project',
    name: 'メインプロジェクト',
  },
  {
    login: 'test-project',
    name: 'テストプロジェクト',
  },
  {
    login: 'development',
    name: '開発用プロジェクト',
  },
]

/**
 * プロジェクトシードを実行する
 */
export async function seedProjects(): Promise<void> {
  const prisma = await createPrismaClient()

  try {
    console.log('📝 プロジェクトデータのシードを開始します...')

    for (const project of projects) {
      const entity = new ProjectEntity({
        id: randomUUID(),
        login: project.login,
        name: new NameValue(project.name),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })

      try {
        // プロジェクトを作成 (既存のloginがあれば更新しない)
        await prisma.prismaProject.upsert({
          where: { login: entity.login },
          update: {},
          create: {
            id: entity.id,
            login: entity.login,
            name: entity.name.value,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
          },
        })
        console.log(`✅ プロジェクト '${entity.login}' を作成しました`)
      } catch (error) {
        console.error(
          `❌ プロジェクト '${entity.login}' の作成に失敗しました:`,
          (error as Error).message
        )
      }
    }

    console.log('✨ プロジェクトデータのシードが完了しました')
  } finally {
    await prisma.$disconnect()
  }
}