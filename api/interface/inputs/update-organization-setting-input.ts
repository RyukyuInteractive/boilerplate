import { builder } from "~/interface/builder"

export const PothosUpdateOrganizationSettingInput = builder.inputType(
  "UpdateOrganizationSettingInput",
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
