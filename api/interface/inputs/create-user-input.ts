import { builder } from "~/interface/builder"

export const PothosCreateUserInput = builder.inputType("CreateUserInput", {
  description: undefined,
  fields(t) {
    return {
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }
  },
})
