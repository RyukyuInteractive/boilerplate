import fs from "node:fs/promises"
import path from "node:path"
import { readCsvRecords } from "~/lib/utils/read-csv-records"
import { toMermaidFromPageRecord } from "~/lib/utils/to-mermaid-from-page-record"

const csvRecords = await readCsvRecords("pages.csv", [
  "path",
  "name",
  "description",
  "deprecated_reason",
  "file",
])

/**
 * Mermaid図の生成に必要なフィールドのみを抽出
 */
const mermaidRecords = csvRecords.map((page) => ({
  path: page.path,
  name: page.name,
}))

const mermaid = toMermaidFromPageRecord(mermaidRecords)

const outputPath = path.resolve(process.cwd(), "pages.mermaid")

await fs.writeFile(outputPath, mermaid, "utf8")

console.log(`Mermaid図を生成しました: ${outputPath}`)
