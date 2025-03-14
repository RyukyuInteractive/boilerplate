import type { HonoEnv, YogaContext } from "env"
import { createYoga } from "graphql-yoga"
import { contextStorage } from "hono/context-storage"
import { getContext } from "hono/context-storage"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { factory } from "~/interface/factory"
import { databaseMiddleware } from "~/interface/middlewares/database-middleware"
import { sessionMiddleware } from "~/interface/middlewares/session-middleware"
import { schema } from "~/interface/schema"

import * as auth_session from "~/interface/routes/auth.session"
import * as auth_sign_in from "~/interface/routes/auth.sign.in"
import * as auth_sign_out from "~/interface/routes/auth.sign.out"
import * as auth_sign_up from "~/interface/routes/auth.sign.up"

/**
 * Hono
 */
export const app = factory
  .createApp()
  .use(cors({ credentials: true, origin: (v) => v }))
  .use(contextStorage())
  .use(databaseMiddleware)
  .use(sessionMiddleware)
  .get("/auth/session", ...auth_session.GET)
  .post("/auth/sign/in", ...auth_sign_in.POST)
  .post("/auth/sign/up", ...auth_sign_up.POST)
  .post("/auth/sign/out", ...auth_sign_out.POST)

/**
 * GraphQL
 */
const graphql = createYoga({
  schema,
  graphqlEndpoint: "/",
  landingPage: false,
  logging: "info",
  cors: { origin: "*", credentials: true },
  context(context): YogaContext {
    const honoContext = getContext<HonoEnv>()
    return {
      ...context,
      var: honoContext.var,
      env: honoContext.env,
    }
  },
})

app.mount("/graphql", graphql)

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return c.json({ message: e.message }, { status: e.status })
  }
  return c.json({ message: e.message }, { status: 500 })
})

export default app
