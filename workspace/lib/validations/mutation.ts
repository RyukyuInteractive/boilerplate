import { object, string } from "valibot"

export const vMutation = object({
  id: string(),
  description: string(),
})
