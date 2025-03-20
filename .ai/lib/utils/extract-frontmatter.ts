type Result = {
  description: string
  globs: string
  alwaysApply: string
}

export function extractFrontmatter(markdownText: string): Result {
  const result: Result = {
    description: "",
    globs: "",
    alwaysApply: "",
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---/

  const match = markdownText.match(frontmatterRegex)

  if (!match) {
    return result
  }

  const [, frontmatter] = match

  const texts = frontmatter.split("\n")

  for (const line of texts) {
    // キーと値に分割
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) {
      continue
    }

    const key = line.substring(0, colonIndex).trim()
    const value = line.substring(colonIndex + 1).trim()

    // 対応するフィールドに値を設定
    if (key === "description") {
      result.description = value
    }

    if (key === "globs") {
      result.globs = value
    }

    if (key === "alwaysApply") {
      result.alwaysApply = value
    }
  }

  return result
}
