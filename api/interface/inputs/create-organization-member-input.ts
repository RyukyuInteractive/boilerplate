import { builder } from "~/interface/builder"

export const PothosOrganizationMemberInput = builder.inputType(
  "CreateOrganizationMember",
  {
    description: undefined,
    fields(t) {
      return {
        organizationId: t.string({ required: true }),
        userId: t.string({ required: true }),
        role: t.string({ required: true }),
      }
    },
  },
)
