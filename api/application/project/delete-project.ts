import type { Context } from "~/env"
import { ProjectRepository } from "~/infrastructure/repositories/project.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  projectId: string
}

/**
 * プロジェクトを論理削除する
 */
export class DeleteProject {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new ProjectRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const project = await this.deps.repository.read(props.projectId)

      if (project === null) {
        return new NotFoundGraphQLError("プロジェクトが見つかりません。")
      }

      if (project.deletedAt !== null) {
        return new NotFoundGraphQLError("プロジェクトが見つかりません。")
      }

      const draft = project.delete()

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return { id: draft.id }
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
