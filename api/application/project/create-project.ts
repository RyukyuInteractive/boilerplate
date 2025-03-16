import { ProjectEntity } from "~/domain/entities/project.entity"
import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { ProjectRepository } from "~/infrastructure/repositories/project.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  userId: string
  name: string
  nameEN?: string | null
  organizationId?: string | null
}

export class CreateProject {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new ProjectRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const user = await this.c.var.database.prismaUser.findUnique({
        where: { id: props.userId },
      })

      if (user === null) {
        return new NotFoundGraphQLError("ユーザーが見つかりません。")
      }

      const projectId = crypto.randomUUID()

      const project = new ProjectEntity({
        id: projectId,
        login: projectId,
        name: new NameValue(props.name),
        organizationId: props.organizationId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })

      const writeResult = await this.deps.repository.write(project)

      if (writeResult instanceof Error) {
        return new InternalGraphQLError("プロジェクトの作成に失敗しました。")
      }

      await this.c.var.database.prismaProjectMember.create({
        data: {
          id: crypto.randomUUID(),
          projectId: project.id,
          userId: props.userId,
          role: "OWNER",
          createdAt: new Date(),
        },
      })

      return project
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
