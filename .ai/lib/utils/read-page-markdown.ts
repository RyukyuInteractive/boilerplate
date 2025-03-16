import { readPageFeatureListMarkdown } from "./read-page-feature-list-markdown"

type Page = Record<
  | "path"
  | "name"
  | "description"
  | "is_deprecated"
  | "deprecated_reason"
  | "file",
  string
>

/**
 * ページをマークダウンに変換する
 */
export async function readPageMarkdown(page: Page) {
  const description = page.description || "（説明なし）"

  let markdown = ""

  markdown += `## ${page.name}`

  markdown += "\n\n"

  markdown += "```\n"
  markdown += `${page.path}\n`
  markdown += "```"

  markdown += "\n\n"

  markdown += `${description}\n`

  const featureListMarkdown = await readPageFeatureListMarkdown(page.path)

  if (featureListMarkdown) {
    markdown += "\n"
    markdown += "### 機能"
    markdown += "\n\n"
    markdown += featureListMarkdown
  }

  return markdown.trim()
}
