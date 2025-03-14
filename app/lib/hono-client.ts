import { hc } from "hono/client"

// @ts-ignore
import type { app } from "~/../api/src/main"

export const honoClient = hc<typeof app>(import.meta.env.VITE_API_BASE_URL, {
  async fetch(input: RequestInfo | URL, init?: RequestInit) {
    // credentialsを設定してCookieを送信する
    const resp = await fetch(input, { ...init, credentials: "include" })

    // 200以外は例外を発生させる
    if (!resp.ok) {
      const error = await resp.json()
      if (typeof error === "object" && error !== null && "message" in error) {
        throw new Error(error.message as string)
      }
      throw new Error(resp.statusText)
    }

    return resp
  },
})
