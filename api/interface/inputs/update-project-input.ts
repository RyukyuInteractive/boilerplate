import { builder } from "~/interface/builder"

export const PothosUpdateProjectInput = builder.inputType(
  "UpdateProjectInput",
  {
    description: undefined,
    fields(t) {
      return {
        name: t.string({ required: true }),
      }
    },
  },
)
