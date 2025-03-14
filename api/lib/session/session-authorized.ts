import { getSignedCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import { decode } from "hono/jwt"
import { type InferOutput, safeParse } from "valibot"
import { UnauthorizedException } from "~/lib/errors/unauthorized-error"
import { vSessionPayload } from "~/lib/session/session-payload"

export function sessionAuthorized() {
  return createMiddleware<{
    Variables: {
      session: InferOutput<typeof vSessionPayload>
    }
    Bindings: {
      JWT_SECRET: string
      JWT_COOKIE_KEY: string
      JWT_COOKIE_SECRET: string
    }
  }>(async (c, next) => {
    if (c.env.JWT_SECRET === undefined) {
      throw new Error("JWT_SECRET is not defined")
    }

    if (c.env.JWT_COOKIE_KEY === undefined) {
      throw new Error("JWT_COOKIE_KEY is not defined")
    }

    if (c.env.JWT_COOKIE_SECRET === undefined) {
      throw new Error("JWT_COOKIE_SECRET is not defined")
    }

    const cookie = await getSignedCookie(
      c,
      c.env.JWT_COOKIE_SECRET,
      c.env.JWT_COOKIE_KEY,
    )

    if (typeof cookie !== "string") {
      throw new UnauthorizedException()
    }

    const session = safeParse(vSessionPayload, decode(cookie).payload)

    if (session.success === false) {
      throw new UnauthorizedException()
    }

    c.set("session", session.output)

    return next()
  })
}
