import { NameValue } from "~/domain/values/name.value"
import type { Context } from "~/env"
import { UserRepository } from "~/infrastructure/repositories/user.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"
import { NotFoundGraphQLError } from "~/interface/errors/not-found-graphql-error"

/**
 * ユーザー更新のパラメータ
 */
type Props = {
  id: string
  name: string
  email: string
  login: string
  displayName: string
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
      const user = await this.deps.repository.read(props.id)

      if (user === null) {
        return new NotFoundGraphQLError("指定されたユーザーが存在しません。")
      }

      const draft = user
        .updateName(new NameValue(props.name))
        .updateEmail(props.email)
        .updateLogin(props.login)

      const result = await this.deps.repository.write(draft)

      if (result instanceof Error) {
        return new InternalGraphQLError()
      }

      return user
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
