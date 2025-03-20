import { config } from "./config"
import { readCsvRecords } from "./utils/read-csv-records"
import { toMermaidFromPageRecord } from "./utils/to-mermaid-from-page-record"
import { writeTextFile } from "./utils/write-text-file"

export async function updatePagesMermaid() {
  const csvRecords = await readCsvRecords(config.path.pages, [
    "path",
    "name",
    "description",
    "deprecated_reason",
    "file",
  ])

  const mermaidRecords = csvRecords.map((page) => ({
    path: page.path,
    name: page.name,
  }))

  const mermaid = toMermaidFromPageRecord(mermaidRecords)

  await writeTextFile(mermaid, config.root, "pages.mermaid")
}
