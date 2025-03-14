import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  organizationId: string
  key: string
  value: string
}

/**
 * 組織の設定を更新する
 */
export class UpdateOrganizationSetting {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const organization =
        await this.c.var.database.prismaOrganization.findUnique({
          where: { id: props.organizationId },
        })

      if (organization === null) {
        return new HTTPException(404, {
          message: "組織が見つかりません。",
        })
      }

      const setting =
        await this.c.var.database.prismaOrganizationSetting.upsert({
          where: {
            organizationId_key: {
              organizationId: props.organizationId,
              key: props.key,
            },
          },
          create: {
            id: crypto.randomUUID(),
            organizationId: props.organizationId,
            key: props.key,
            value: props.value,
          },
          update: {
            value: props.value,
          },
        })

      return setting
    } catch (error) {
      return new HTTPException(500, {
        message:
          "組織設定の更新に失敗しました。詳細が不明なエラーが発生しました。",
      })
    }
  }
}
