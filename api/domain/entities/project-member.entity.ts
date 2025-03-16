import { type InferInput, date, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  projectId: string(),
  userId: string(),
  role: string(),
  createdAt: date(),
})

type Props = InferInput<typeof vProps>

export class ProjectMemberEntity implements Props {
  readonly id!: Props["id"]
  readonly projectId!: Props["projectId"]
  readonly userId!: Props["userId"]
  readonly role!: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"
  readonly createdAt!: Props["createdAt"]

  constructor(readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }
}
