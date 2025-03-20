import { config } from "../config"
import { readPageFeatureListMarkdown } from "./read-page-feature-list-markdown"
import { readTextFileSafe } from "./read-text-file-safe"
import { removeFrontmatter } from "./remove-frontmatter"

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
    markdown += featureListMarkdown
  }

  const text = await readTextFileSafe(
    config.path.cursorRules,
    `app.interface.routes.${page.path}.mdc`,
  )

  if (text !== null) {
    markdown += "\n\n"
    markdown += removeFrontmatter(text)
  }

  return markdown.trim()
}
