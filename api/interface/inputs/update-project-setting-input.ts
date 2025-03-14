import { builder } from "~/interface/builder"

export const PothosUpdateProjectSettingInput = builder.inputType(
  "UpdateProjectSettingInput",
  {
    description: undefined,
    fields(t) {
      return {
        key: t.string({ required: true }),
        value: t.string({ required: true }),
      }
    },
  },
)
