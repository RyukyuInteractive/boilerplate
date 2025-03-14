import { cors } from "hono/cors"

export function sessionCors() {
  return cors({
    credentials: true,
    origin: (origin) => origin,
  })
}
