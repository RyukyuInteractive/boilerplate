import { randomUUID } from 'crypto'
import { createPrismaClient } from './seed-helper'
import { ProjectMemberEntity } from '~/domain/entities/project-member.entity'

/**
 * プロジェクトメンバーシードを実行する
 * 既存のプロジェクトに対して、ユーザーをメンバーとして追加する
 */
export async function seedProjectMembers(): Promise<void> {
  const prisma = await createPrismaClient()

  try {
    console.log('📝 プロジェクトメンバーデータのシードを開始します...')

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

    // 最初のユーザーをすべてのプロジェクトのオーナーとして設定
    const ownerUser = users[0]
    
    // 残りのユーザーをプロジェクトのメンバーとして設定
    const memberUsers = users.slice(1)
    
    // 各プロジェクトについて
    for (const project of projects) {
      console.log(`🏢 プロジェクト '${project.login}' のメンバーをシードします...`)
      
      // オーナーを追加
      try {
        const existingOwner = await prisma.prismaProjectMember.findUnique({
          where: {
            projectId_userId: {
              projectId: project.id,
              userId: ownerUser.id,
            },
          },
        })

        if (!existingOwner) {
          const ownerEntity = new ProjectMemberEntity({
            id: randomUUID(),
            projectId: project.id,
            userId: ownerUser.id,
            role: 'OWNER',
            createdAt: new Date(),
          })

          await prisma.prismaProjectMember.create({
            data: {
              id: ownerEntity.id,
              projectId: ownerEntity.projectId,
              userId: ownerEntity.userId,
              role: ownerEntity.role,
              createdAt: ownerEntity.createdAt,
            },
          })
          console.log(`✅ ユーザー '${ownerUser.login}' をオーナーとして追加しました`)
        } else {
          console.log(`⚠️ ユーザー '${ownerUser.login}' は既にオーナーとして登録されています`)
        }
      } catch (error) {
        console.error(`❌ オーナーの追加に失敗しました:`, (error as Error).message)
      }

      // 他のユーザーをランダムなロールで追加
      const roles = ['ADMIN', 'MEMBER', 'VIEWER']
      
      for (const user of memberUsers) {
        try {
          const existingMember = await prisma.prismaProjectMember.findUnique({
            where: {
              projectId_userId: {
                projectId: project.id,
                userId: user.id,
              },
            },
          })

          if (!existingMember) {
            // ランダムなロールを選択
            const role = roles[Math.floor(Math.random() * roles.length)] as 'ADMIN' | 'MEMBER' | 'VIEWER'
            
            const memberEntity = new ProjectMemberEntity({
              id: randomUUID(),
              projectId: project.id,
              userId: user.id,
              role,
              createdAt: new Date(),
            })

            await prisma.prismaProjectMember.create({
              data: {
                id: memberEntity.id,
                projectId: memberEntity.projectId,
                userId: memberEntity.userId,
                role: memberEntity.role,
                createdAt: memberEntity.createdAt,
              },
            })
            console.log(`✅ ユーザー '${user.login}' を${role}として追加しました`)
          } else {
            console.log(`⚠️ ユーザー '${user.login}' は既にプロジェクトメンバーとして登録されています`)
          }
        } catch (error) {
          console.error(`❌ メンバーの追加に失敗しました:`, (error as Error).message)
        }
      }
    }

    console.log('✨ プロジェクトメンバーデータのシードが完了しました')
  } finally {
    await prisma.$disconnect()
  }
}