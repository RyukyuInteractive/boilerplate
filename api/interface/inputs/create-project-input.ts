import { builder } from "~/interface/builder"

export const PothosCreateProjectInput = builder.inputType(
  "CreateProjectInput",
  {
    description: undefined,
    fields(t) {
      return {
        name: t.string({ required: true }),
        organizationId: t.id(),
      }
    },
  },
)
