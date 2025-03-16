import fs from "node:fs/promises"
import { config } from "../config"
import { readCsvRecords } from "./utils/read-csv-records"
import { toMermaidFromPageRecord } from "./utils/to-mermaid-from-page-record"

export async function updatePagesMermaid() {
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

  const outputPath = `${process.cwd()}/${config.root}/pages.mermaid`

  await fs.writeFile(outputPath, mermaid, "utf8")

  console.log(`Mermaid図を生成しました: ${outputPath}`)
}
