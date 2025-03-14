import { nullable, number, object, string } from "valibot"

export const vFeature = object({
  path: string(),
  priority: number(),
  name: string(),
  description: string(),
  deprecated_reason: nullable(string()),
})
