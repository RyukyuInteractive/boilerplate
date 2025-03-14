import type { SamplePost } from "~/infrastructure/types/sample-post"

export class SamplePostAdapter {
  /**
   * お知らせの一覧を取得する
   */
  async getPosts(): Promise<SamplePost[]> {
    return [
      {
        id: crypto.randomUUID(),
        title: "システム更新のお知らせ",
        body: "システムのメンテナンスが予定されています。",
        createdAt: Math.floor(
          new Date("2025-01-02T00:00:00Z").getTime() / 1000,
        ),
      },
      {
        id: crypto.randomUUID(),
        title: "重要なお知らせ",
        body: "重要なシステムの変更があります。",
        createdAt: Math.floor(
          new Date("2025-01-01T12:00:00Z").getTime() / 1000,
        ),
      },
      {
        id: crypto.randomUUID(),
        title: "システムメンテナンスのお知らせ",
        body: "システムのメンテナンスが予定されています。",
        createdAt: Math.floor(
          new Date("2025-01-01T00:00:00Z").getTime() / 1000,
        ),
      },
      {
        id: crypto.randomUUID(),
        title: "新機能のお知らせ",
        body: "新しい機能が追加されました。",
        createdAt: Math.floor(
          new Date("2025-01-03T15:30:00Z").getTime() / 1000,
        ),
      },
    ]
  }
}
