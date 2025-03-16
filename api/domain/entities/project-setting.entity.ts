import { type InferInput, date, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  projectId: string(),
  key: string(),
  value: string(),
  createdAt: date(),
  updatedAt: date(),
})

type Props = InferInput<typeof vProps>

/**
 * プロジェクト設定
 */
export class ProjectSettingEntity implements Props {
  readonly id!: Props["id"]
  readonly projectId!: Props["projectId"]
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
    return new ProjectSettingEntity({
      ...this.props,
      value,
      updatedAt: new Date(),
    })
  }
}
