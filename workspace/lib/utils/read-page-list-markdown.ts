import { readCsvRecords } from "~/lib/utils/read-csv-records"
import { readPageMarkdown } from "~/lib/utils/read-page-markdown"

/**
 * ページ一覧をマークダウンに変換する
 */
export async function readPageListMarkdown() {
  const pages = await readCsvRecords("pages.csv", [
    "path",
    "name",
    "description",
    "is_deprecated",
    "deprecated_reason",
    "file",
  ])

  let markdown = ""

  for (const page of pages) {
    markdown += "\n\n"
    markdown += await readPageMarkdown(page)
  }

  return markdown.trim()
}
