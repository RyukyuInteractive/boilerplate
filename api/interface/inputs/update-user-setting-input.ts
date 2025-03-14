import { builder } from "~/interface/builder"

export const PothosUpdateUserSettingInput = builder.inputType(
  "UpdateUserSettingInput",
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
