import { object, string } from "valibot"

export const vSessionPayload = object({
  userId: string(),
  name: string(),
  email: string(),
})
