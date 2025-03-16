import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"
import { OrganizationRepository } from "~/infrastructure/repositories/organization.repository"

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
        return new HTTPException(404, {
          message: "組織が見つかりません。",
        })
      }

      // 組織名を更新
      const draft = organization.updateName(props.name)

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new HTTPException(500, {
          message: "組織の更新に失敗しました。",
        })
      }

      return draft
    } catch (error) {
      return new HTTPException(500, {
        message: "組織の更新に失敗しました。詳細が不明なエラーが発生しました。",
      })
    }
  }
}
