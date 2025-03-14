import { type InferInput, date, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  login: string(),
  name: string(),
  createdAt: date(),
  updatedAt: date(),
})

type Props = InferInput<typeof vProps>

/**
 * 組織
 */
export class OrganizationEntity implements Props {
  readonly id: Props["id"]
  readonly login: Props["login"]
  readonly name: Props["name"]
  readonly createdAt: Props["createdAt"]
  readonly updatedAt: Props["updatedAt"]

  constructor(readonly props: Props) {
    parse(vProps, props)
    this.id = props.id
    this.login = props.login
    this.name = props.name
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  /**
   * 組織名を更新する
   */
  updateName(name: string) {
    return new OrganizationEntity({
      ...this.props,
      name,
      updatedAt: new Date(),
    })
  }
}
