import { type InferInput, date, nullable, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  projectId: string(),
  title: string(),
  message: string(),
  type: string(),
  createdAt: date(),
  deletedAt: nullable(date()),
})

type Props = InferInput<typeof vProps>

/**
 * プロジェクト通知
 */
export class ProjectNotificationEntity implements Props {
  readonly id!: Props["id"]
  readonly projectId!: Props["projectId"]
  readonly title!: Props["title"]
  readonly message!: Props["message"]
  readonly type!: Props["type"]
  readonly createdAt!: Props["createdAt"]
  readonly deletedAt!: Props["deletedAt"]

  constructor(readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }

  /**
   * 通知を削除する
   */
  delete() {
    return new ProjectNotificationEntity({
      ...this.props,
      deletedAt: new Date(),
    })
  }
}
