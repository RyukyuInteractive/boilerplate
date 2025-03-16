import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { ProjectRepository } from "~/infrastructure/repositories/project.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  projectId: string
  name: string
}

/**
 * プロジェクトを更新する
 */
export class UpdateProject {
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
        return new NotFoundGraphQLError("プロジェクトが見つかりませんでした")
      }

      const draft = project.updateName(new NameValue(props.name))

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return null
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
