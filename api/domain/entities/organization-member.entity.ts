import { type InferInput, date, object, parse, string } from "valibot"

const vProps = object({
  id: string(),
  organizationId: string(),
  userId: string(),
  role: string(),
  createdAt: date(),
})

type Props = InferInput<typeof vProps>

export class OrganizationMemberEntity implements Props {
  readonly id!: Props["id"]
  readonly organizationId!: Props["organizationId"]
  readonly userId!: Props["userId"]
  readonly role!: "OWNER" | "ADMIN" | "MEMBER"
  readonly createdAt!: Props["createdAt"]

  constructor(readonly props: Props) {
    Object.assign(this, parse(vProps, props))
  }
}
