import { getSignedCookie } from "hono/cookie"
import { decode } from "hono/jwt"
import { safeParse } from "valibot"
import { factory } from "~/interface/factory"
import { vSessionPayload } from "~/lib/session/session-payload"

export const GET = factory.createHandlers(async (c) => {
  const cookie = await getSignedCookie(
    c,
    c.env.JWT_COOKIE_SECRET,
    c.env.JWT_COOKIE_KEY,
  )

  if (typeof cookie !== "string") {
    return c.json(null)
  }

  const session = safeParse(vSessionPayload, decode(cookie).payload)

  if (session.success === false) {
    return c.json(null)
  }

  if (session.success !== true) {
    return c.json(null)
  }

  return c.json(session.output)
})
