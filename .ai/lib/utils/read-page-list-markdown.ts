import { config } from "../config"
import { readCsvRecords } from "./read-csv-records"
import { readPageMarkdown } from "./read-page-markdown"
import { removeFrontmatter } from "./remove-frontmatter"

export async function readPageListMarkdown() {
  const pages = await readCsvRecords(config.path.pages, [
    "path",
    "name",
    "description",
    "is_deprecated",
    "deprecated_reason",
    "file",
  ])

  let markdown = ""

  for (const page of pages) {
    const content = await readPageMarkdown(page)
    markdown += "\n\n"
    markdown += removeFrontmatter(content)
  }

  return markdown.trim()
}
