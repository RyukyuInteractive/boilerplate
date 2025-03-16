import { hashSync } from "bcrypt-ts"
import type { Context } from "env"
import { UserEntity } from "~/domain/entities/user.entity"
import { NameValue } from "~/domain/values/name.value"
import { UserRepository } from "~/infrastructure/repositories/user.repository"
import { InternalGraphQLError } from "~/interface/errors/internal-graphql-error"

type Props = {
  email: string
  password: string
}

/**
 * アカウントを作成する
 */
export class CreateUser {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const userId = crypto.randomUUID()

      const repository = new UserRepository(this.c)

      const user = new UserEntity({
        id: userId,
        login: userId,
        email: props.email,
        hashedPassword: hashSync(props.password),
        name: new NameValue(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })

      const result = await repository.write(user)

      if (result instanceof Error) {
        return new InternalGraphQLError("ユーザの作成に失敗しました。")
      }

      return user
    } catch (error) {
      return new InternalGraphQLError()
    }
  }
}
