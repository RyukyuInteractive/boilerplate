import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  userId: string
  key: string
  value: string
}

/**
 * ユーザー設定を更新する
 */
export class UpdateUserSetting {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const user = await this.c.var.database.prismaUser.findUnique({
        where: { id: props.userId },
      })

      if (user === null) {
        return new HTTPException(404, {
          message: "ユーザーが見つかりませんでした",
        })
      }

      const setting = await this.c.var.database.prismaUserSetting.upsert({
        where: {
          userId_key: {
            userId: props.userId,
            key: props.key,
          },
        },
        create: {
          id: crypto.randomUUID(),
          userId: props.userId,
          key: props.key,
          value: props.value,
        },
        update: {
          value: props.value,
        },
      })

      return setting
    } catch (error) {
      if (error instanceof Error) {
        return new HTTPException(500, {
          message: `ユーザー設定の更新に失敗しました: ${error.message}`,
        })
      }
      return new HTTPException(500, {
        message: "ユーザー設定の更新に失敗しました",
      })
    }
  }
}
