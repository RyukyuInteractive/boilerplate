/**
 * ルートファイル名からパスを生成する
 * 例: _main.index.tsx -> /
 * 例: _main.my.account.tsx -> /my/account
 * 例: $project.logs.$log.tsx -> /:project/logs/:log
 */
export function toPathFromFilename(filename: string): string {
  const withoutExtension = filename.replace(/\.tsx$/, "")

  const segments = withoutExtension.split(".")

  const processedSegments = segments
    .map((segment) => {
      if (segment === "_main") return null
      if (segment.startsWith("$")) return `$${segment.substring(1)}`
      return segment
    })
    .filter((segment): segment is string => {
      if (segment === "index") return false
      return segment !== null
    })

  const routePath = processedSegments.join(".")

  if (routePath === "") return "index"

  if (routePath === "index") return "index"

  return routePath
}
