import { hashSync } from "bcrypt-ts"
import type { Context } from "env"
import { HTTPException } from "hono/http-exception"
import { UserEntity } from "~/domain/entities/user.entity"
import { NameValue } from "~/domain/values/name.value"
import { UserRepository } from "~/infrastructure/repositories/user.repository"

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

      await repository.write(user)

      return user
    } catch (error) {
      return new HTTPException(500, {
        message:
          "アカウントの作成に失敗しました。詳細が不明なエラーが発生しました。",
      })
    }
  }
}
