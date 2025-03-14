/**
 * ルートパスから表示名を生成する
 * 例: / -> ホーム
 * 例: /my/account -> アカウント
 * 例: /:project/logs/:log -> ログ詳細
 */
export function toPageNameFromPath(routePath: string): string {
  if (routePath === "/") return "ホーム"

  // パスの最後のセグメントを取得
  const lastSegment = routePath.split("/").filter(Boolean).pop() || ""

  // :パラメータ部分を除去
  const cleanSegment = lastSegment.replace(/^:/, "")

  // キャメルケースをスペース区切りの単語に変換
  const segmentWithSpaces = cleanSegment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()

  // 最初の文字を大文字に
  const capitalizedSegment =
    segmentWithSpaces.charAt(0).toUpperCase() + segmentWithSpaces.slice(1)

  return capitalizedSegment
}
