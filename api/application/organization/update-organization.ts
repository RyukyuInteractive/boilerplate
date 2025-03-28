import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  id: string
  name: string
  description?: string | null
}

/**
 * 組織を更新する
 */
export class UpdateOrganization {
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
        return new NotFoundGraphQLError("組織が見つかりません。")
      }

      const draft = organization.updateName(new NameValue(props.name))

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError("組織の更新に失敗しました。")
      }

      return draft
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
