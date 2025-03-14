import type { PrismaClient } from "@prisma/client"
import type { YogaInitialContext } from "graphql-yoga"
import type { InferOutput } from "valibot"
import type { vSessionPayload } from "~/lib/session/session-payload"

/**
 * 環境変数
 */
export type Bindings = {
  DB: D1Database
  JWT_COOKIE_SECRET: string
  JWT_COOKIE_KEY: string
  JWT_SECRET: string
  CORS_DOMAIN: string
}

/**
 * 変数
 */
export type Variables = {
  database: PrismaClient
  session: InferOutput<typeof vSessionPayload> | null
}

/**
 * Context Storage
 * https://hono.dev/docs/middleware/builtin/context-storage#context-storage-middleware
 */
export type Context = {
  var: Variables
  env: Bindings
}

/**
 * Hono Context
 * @example new Hono<Env>()
 */
export type HonoEnv = {
  Bindings: Bindings
  Variables: Variables
}

/**
 * Yoga Context
 * 環境変数はYogaInitialContextに統合される
 * https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-cloudflare-workers
 * @example createYoga<YogaContext>
 */
export type YogaContext = YogaInitialContext & Context
