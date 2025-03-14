import type { Page } from "~/lib/types/product"
import { readPageFeatureListMarkdown } from "~/lib/utils/read-page-feature-list-markdown"

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
    markdown += "\n### 機能一覧\n\n"
    markdown += featureListMarkdown
  }

  return markdown.trim()
}
