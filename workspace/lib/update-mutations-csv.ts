import fs from "node:fs/promises"
import path from "node:path"
import { glob } from "glob"
import { parse } from "valibot"
import { vMutation } from "./validations/mutation"
import { readCsvMutations } from "~/lib/utils/read-csv-mutations"
import { config } from "~/config"
import { toCsvFromRecord } from "~/lib/utils/to-csv-from-record"

const currentMap = await readCsvMutations()

const draftMap = new Map(currentMap)

const fileDirectory = path.resolve(
  process.cwd(),
  "..",
  config.directories.apiMutations,
)

const files = glob.sync("*.ts", {
  cwd: fileDirectory,
  absolute: true,
})

for (const filePath of files) {
  const filename = path.basename(filePath)

  const id = generateIdFromFilename(filename)

  const content = await fs.readFile(filePath, "utf8")

  const description = extractDescriptionFromContent(content)

  const record = currentMap.get(id)

  draftMap.set(
    id,
    parse(vMutation, {
      id,
      description: record?.description || description,
    }),
  )
}

const records = Array.from(draftMap.values())

const sortedRecords = [...records].toSorted((a, b) => a.id.localeCompare(b.id))

const csvContent = toCsvFromRecord(sortedRecords, ["id", "description"])

const outputPath = path.resolve(process.cwd(), "sheets/mutations.csv")

await fs.writeFile(outputPath, csvContent)

console.log(`CSV file has been written to ${outputPath}\n`)

/**
 * ファイル名からIDを生成する
 * 例: create-organization.ts -> create-organization
 */
function generateIdFromFilename(filename: string): string {
  return filename.replace(/\.ts$/, "")
}

/**
 * ファイルの内容から説明を抽出する
 * 例: description: "新しい組織を作成する" -> 新しい組織を作成する
 */
function extractDescriptionFromContent(content: string): string {
  const match = content.match(/description: ["'](.+?)["']/)
  return match ? match[1] : ""
}
