import type { Context } from "~/env"
import { ProjectMemberRepository } from "~/infrastructure/repositories/project-member.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  projectId: string
  userId: string
}

/**
 * プロジェクトメンバーを削除する
 */
export class DeleteProjectMember {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new ProjectMemberRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const projectMember = await this.deps.repository.read(
        props.projectId,
        props.userId,
      )

      if (projectMember === null) {
        return new NotFoundGraphQLError(
          "プロジェクトメンバーが見つかりませんでした。",
        )
      }

      await this.c.var.database.prismaProjectMember.delete({
        where: { id: props.userId },
      })

      return { id: props.userId }
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
