import type { InferResponseType } from "hono"
import { createContext } from "react"
import { honoClient } from "~/lib/hono-client"

const endpoint = honoClient.auth.session

type Value = [
  InferResponseType<typeof endpoint.$get> | null,
  () => Promise<void>,
]

export const SessionContext = createContext<Value>([null, async () => {}])
