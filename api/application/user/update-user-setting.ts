import { UserSettingEntity } from "~/domain/entities/user-setting.entity"
import type { Context } from "~/env"
import { UserSettingRepository } from "~/infrastructure/repositories/user-setting.repository"
import { UserRepository } from "~/infrastructure/repositories/user.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

type Props = {
  userId: string
  key: string
  value: string
}

/**
 * ユーザー設定を更新する
 */
export class UpdateUserSetting {
  constructor(
    readonly c: Context,
    readonly deps = {
      userRepository: new UserRepository(c),
      userSettingRepository: new UserSettingRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      // ユーザーの存在確認
      const user = await this.deps.userRepository.read(props.userId)

      if (user === null) {
        return new NotFoundGraphQLError("ユーザーが見つかりませんでした")
      }

      let draft = await this.deps.userSettingRepository.read(
        props.userId,
        props.key,
      )

      if (draft === null) {
        draft = new UserSettingEntity({
          id: crypto.randomUUID(),
          userId: props.userId,
          key: props.key,
          value: props.value,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      } else {
        draft = draft.updateValue(props.value)
      }

      const result = await this.deps.userSettingRepository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return draft
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
