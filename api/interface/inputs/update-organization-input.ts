import { builder } from "~/interface/builder"

export const PothosUpdateOrganizationInput = builder.inputType(
  "UpdateOrganizationInput",
  {
    description: undefined,
    fields(t) {
      return {
        name: t.string({ required: true }),
        description: t.string(),
      }
    },
  },
)
