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
 * 組織
 */
export class OrganizationEntity implements Props {
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
   * 組織名を更新する
   */
  updateName(name: NameValue) {
    return new OrganizationEntity({
      ...this.props,
      name,
      updatedAt: new Date(),
    })
  }

  /**
   * 組織を削除する
   */
  delete() {
    return new OrganizationEntity({
      ...this.props,
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
