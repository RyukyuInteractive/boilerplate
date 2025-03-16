import { readCsvRecords } from "./read-csv-records"

export async function readMutationListMarkdown() {
  const mutations = await readCsvRecords("mutations.csv", ["id", "description"])

  let markdown = ""

  markdown += "| ID | 説明 |\n"
  markdown += "| --- | --- |\n"

  // テーブル行として追加
  for (const mutation of mutations) {
    const description = mutation.description || "（説明なし）"
    markdown += `| ${mutation.id} | ${description} |\n`
  }

  return markdown.trim()
}
