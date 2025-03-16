import { ProjectSettingEntity } from "~/domain/entities/project-setting.entity"
import type { Context } from "~/env"
import { ProjectSettingRepository } from "~/infrastructure/repositories/project-setting.repository"
import { ProjectRepository } from "~/infrastructure/repositories/project.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  projectId: string
  key: string
  value: string
}

/**
 * プロジェクトの設定を更新する
 */
export class UpdateProjectSetting {
  constructor(
    readonly c: Context,
    readonly deps = {
      projectRepository: new ProjectRepository(c),
      projectSettingRepository: new ProjectSettingRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const project = await this.deps.projectRepository.read(props.projectId)

      if (project === null) {
        return new NotFoundGraphQLError("プロジェクトが見つかりません。")
      }

      let draft = await this.deps.projectSettingRepository.read(
        props.projectId,
        props.key,
      )

      if (draft === null) {
        draft = new ProjectSettingEntity({
          id: crypto.randomUUID(),
          projectId: props.projectId,
          key: props.key,
          value: props.value,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      } else {
        draft = draft.updateValue(props.value)
      }

      const result = await this.deps.projectSettingRepository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return null
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
