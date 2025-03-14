import { readCsvRecords } from "~/lib/utils/read-csv-records"

export async function readMutationListMarkdown() {
  const mutations = await readCsvRecords("mutations.csv", ["id", "description"])

  let markdown = ""

  for (const mutation of mutations) {
    const description = mutation.description || "（説明なし）"
    markdown += `## ${mutation.id}`
    markdown += "\n\n"
    markdown += description
    markdown += "\n\n"
  }

  return markdown.trim()
}
