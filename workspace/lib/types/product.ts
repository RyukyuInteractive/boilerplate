// filepath: /Users/i/Documents/boilerplate/workspace/lib/types/product.ts
import { type InferInput, object, string } from "valibot"

export const vPage = object({
  path: string(),
  name: string(),
  description: string(),
})

export type Page = InferInput<typeof vPage>

export type Feature = {
  path: string
  priority: string
  name: string
  description: string
}

export type Mutation = {
  id: string
  description: string
}
