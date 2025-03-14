import { HTTPException } from "hono/http-exception"

export class UnauthorizedException extends HTTPException {
  constructor() {
    super(500, { message: "ログインしてください" })
    this.name = "UnauthorizedException"
  }
}
