import { ProjectMemberEntity } from "~/domain/entities/project-member.entity"
import type { Context } from "~/env"
import { ProjectMemberRepository } from "~/infrastructure/repositories/project-member.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"

type Props = {
  projectId: string
  userId: string
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"
}

/**
 * プロジェクトメンバーを作成する
 */
export class CreateProjectMember {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new ProjectMemberRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const memberId = crypto.randomUUID()

      const projectMember = new ProjectMemberEntity({
        id: memberId,
        projectId: props.projectId,
        userId: props.userId,
        role: props.role,
        createdAt: new Date(),
      })

      const result = await this.deps.repository.write(projectMember)

      if (result instanceof Error) {
        return new InternalGraphQLError(
          "プロジェクトメンバーの作成に失敗しました。",
        )
      }

      return projectMember
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
