import { builder } from "~/interface/builder"

export const PothosCreateOrganizationInput = builder.inputType(
  "CreateOrganizationInput",
  {
    description: undefined,
    fields(t) {
      return {
        name: t.string({ required: true }),
        nameEN: t.string(),
      }
    },
  },
)
