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
  name: instance(NameValue),
  createdAt: date(),
  updatedAt: date(),
  deletedAt: nullable(date()),
})

type Props = InferInput<typeof vProps>

/**
 * プロジェクト
 */
export class ProjectEntity implements Props {
  readonly id!: Props["id"]
  readonly login!: Props["login"]
  readonly name!: Props["name"]
  readonly createdAt!: Props["createdAt"]
  readonly updatedAt!: Props["updatedAt"]
  readonly deletedAt!: Props["deletedAt"]

  constructor(readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }

  /**
   * プロジェクト名を更新する
   */
  updateName(name: NameValue) {
    return new ProjectEntity({
      ...this.props,
      name,
      updatedAt: new Date(),
    })
  }

  /**
   * プロジェクトのログイン名を更新する
   */
  updateLogin(login: string) {
    return new ProjectEntity({
      ...this.props,
      login,
      updatedAt: new Date(),
    })
  }

  /**
   * プロジェクトを削除する
   */
  delete() {
    return new ProjectEntity({
      ...this.props,
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
