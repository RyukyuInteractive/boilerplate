import {
  type InferInput,
  date,
  instance,
  nullable,
  object,
  parse,
  string,
} from "valibot"
import { NameValue } from "~/domain/values/name.value"

const vProps = object({
  id: string(),
  login: string(),
  email: string(),
  name: instance(NameValue),
  hashedPassword: string(),
  createdAt: date(),
  updatedAt: date(),
  deletedAt: nullable(date()),
})

type Props = InferInput<typeof vProps>

/**
 * ユーザー
 */
export class UserEntity implements Props {
  readonly id!: Props["id"]

  readonly login!: Props["login"]

  readonly email!: Props["email"]

  readonly name!: Props["name"]

  readonly hashedPassword!: Props["hashedPassword"]

  readonly createdAt!: Props["createdAt"]

  readonly updatedAt!: Props["updatedAt"]

  readonly deletedAt!: Props["deletedAt"]

  constructor(private readonly props: Props) {
    parse(vProps, props)
    Object.assign(this, props)
  }

  /**
   * ユーザー名を更新する
   */
  updateName(name: NameValue) {
    return new UserEntity({ ...this.props, name })
  }

  /**
   * メールアドレスを更新する
   */
  updateEmail(email: string) {
    return new UserEntity({ ...this.props, email })
  }

  /**
   * ユーザー名を更新する
   */
  updateLogin(login: string) {
    return new UserEntity({ ...this.props, login: login })
  }

  /**
   * パスワードハッシュを更新する
   */
  updateHashedPassword(hashedPassword: string) {
    return new UserEntity({ ...this.props, hashedPassword })
  }
}
