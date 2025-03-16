import { type InferInput, date, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  userId: string(),
  key: string(),
  value: string(),
  createdAt: date(),
  updatedAt: date(),
})

type Props = InferInput<typeof vProps>

/**
 * ユーザー設定
 */
export class UserSettingEntity implements Props {
  readonly id!: Props["id"]
  readonly userId!: Props["userId"]
  readonly key!: Props["key"]
  readonly value!: Props["value"]
  readonly createdAt!: Props["createdAt"]
  readonly updatedAt!: Props["updatedAt"]

  constructor(readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }

  /**
   * 設定値を更新する
   */
  updateValue(value: string) {
    return new UserSettingEntity({
      ...this.props,
      value,
      updatedAt: new Date(),
    })
  }
}
