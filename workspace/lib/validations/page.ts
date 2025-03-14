import { boolean, object, string } from "valibot"

export const vPage = object({
  path: string(),
  name: string(),
  description: string(),
  is_deprecated: boolean(),
  deprecated_reason: string(),
  file: string(),
})
