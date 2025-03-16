import { builder } from "~/interface/builder"

export const PothosUpdateUserInput = builder.inputType("UpdateUserInput", {
  description: "ユーザー情報を更新する",
  fields(t) {
    return {
      name: t.string({ required: true }),
      email: t.string({ required: true }),
      displayName: t.string({ required: true }),
      login: t.string({ required: true }),
    }
  },
})
