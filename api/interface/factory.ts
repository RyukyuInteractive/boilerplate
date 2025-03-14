import type { HonoEnv } from "env"
import { createFactory } from "hono/factory"

export const factory = createFactory<HonoEnv>()
