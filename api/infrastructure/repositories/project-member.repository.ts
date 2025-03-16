import { ProjectMemberEntity } from "~/domain/entities/project-member.entity"
import type { Context } from "~/env"

export class ProjectMemberRepository {
  constructor(readonly c: Context) {}

  async write(entity: ProjectMemberEntity) {
    try {
      await this.c.var.database.prismaProjectMember.upsert({
        where: { id: entity.id },
        create: {
          id: entity.id,
          projectId: entity.projectId,
          userId: entity.userId,
          role: entity.role,
          createdAt: entity.createdAt,
        },
        update: {
          projectId: entity.projectId,
          userId: entity.userId,
          role: entity.role,
        },
      })

      return null
    } catch (error) {
      console.error(error)
      return error instanceof Error
        ? error
        : new Error("プロジェクトメンバーの保存に失敗しました")
    }
  }

  async read(
    projectId: string,
    userId: string,
  ): Promise<ProjectMemberEntity | null> {
    try {
      const data =
        await this.c.var.database.prismaProjectMember.findUniqueOrThrow({
          where: {
            projectId_userId: {
              projectId,
              userId,
            },
          },
        })

      return new ProjectMemberEntity({
        id: data.id,
        projectId: data.projectId,
        userId: data.userId,
        role: data.role as "OWNER" | "ADMIN" | "MEMBER" | "VIEWER",
        createdAt: data.createdAt,
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
