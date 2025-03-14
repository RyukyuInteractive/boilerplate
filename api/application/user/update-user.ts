import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { UserRepository } from "~/infrastructure/repositories/user.repository"

/**
 * ユーザー更新のパラメータ
 */
type Props = {
  id: string
  name: string
  email: string
  username?: string
  displayName?: string
  role?: string
}

/**
 * ユーザー情報を更新する
 */
export class UpdateUser {
  constructor(
    readonly c: Context,
    readonly deps = {
      repository: new UserRepository(c),
    },
  ) {}

  async run(props: Props) {
    try {
      let user = await this.deps.repository.read(props.id)

      user = user.updateName(new NameValue(props.name))

      user = user.updateEmail(props.email)

      if (props.username !== undefined) {
        user = user.updateUsername(props.username)
      }

      // 永続化
      await this.deps.repository.write(user)
      return user
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message)
      }
      return new Error("ユーザー情報の更新に失敗しました。")
    }
  }
}
