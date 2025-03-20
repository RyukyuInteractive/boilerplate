export function removeFrontmatter(markdownText: string): string {
  if (markdownText.length === 0) {
    return markdownText
  }

  const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

  const result = markdownText.replace(frontmatterRegex, "")

  return result.trim()
}
