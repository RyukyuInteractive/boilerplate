import { HTTPException } from "hono/http-exception"
import type { Context } from "~/env"

type Props = {
  projectId: string
  key: string
  value: string
}

/**
 * プロジェクトの設定を更新する
 */
export class UpdateProjectSetting {
  constructor(readonly c: Context) {}

  async run(props: Props) {
    try {
      const project = await this.c.var.database.prismaProject.findUnique({
        where: { id: props.projectId },
      })

      if (project === null) {
        return new HTTPException(404, {
          message: "プロジェクトが見つかりませんでした",
        })
      }

      const setting = await this.c.var.database.prismaProjectSetting.upsert({
        where: {
          projectId_key: {
            projectId: props.projectId,
            key: props.key,
          },
        },
        create: {
          id: crypto.randomUUID(),
          projectId: props.projectId,
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
          message: `プロジェクト設定の更新に失敗しました: ${error.message}`,
        })
      }
      return new HTTPException(500, {
        message: "プロジェクト設定の更新に失敗しました",
      })
    }
  }
}
