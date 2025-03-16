import type { Context } from "~/env"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  id: string
  userId: string
}

/**
 * 組織を削除する
 */
export class DeleteOrganization {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new OrganizationRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      const organization = await this.deps.repository.read(props.id)

      if (organization === null) {
        return new NotFoundGraphQLError()
      }

      if (organization.deletedAt !== null) {
        return new NotFoundGraphQLError("組織が見つかりません。")
      }

      // エンティティの delete メソッドを使用して論理削除を行う
      const draft = organization.delete()

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return { id: props.id }
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
