import { builder } from "~/interface/builder"

export const PothosProjectMemberInput = builder.inputType(
  "CreateProjectMemberInput",
  {
    description: undefined,
    fields(t) {
      return {
        projectId: t.string({ required: true }),
        userId: t.string({ required: true }),
        role: t.string({ required: true }),
      }
    },
  },
)
