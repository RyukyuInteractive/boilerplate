import fs from "node:fs/promises"
import { parse } from "valibot"
import { config } from "../config"
import { readCsvMutations } from "./utils/read-csv-mutations"
import { toCsvFromRecord } from "./utils/to-csv-from-record"
import { vMutation } from "./validations/mutation"

export async function updateMutationsCsv() {
  const currentMap = await readCsvMutations()

  const draftMap = new Map(currentMap)

  const fileDirectory = `${process.cwd()}/${config.directories.apiMutations}`

  const glob = new Bun.Glob("*.ts")

  for await (const filename of glob.scan(fileDirectory)) {
    const path = `${fileDirectory}/${filename}`

    const id = generateIdFromFilename(filename)

    const content = await fs.readFile(path, "utf8")

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

  const sortedRecords = [...records].toSorted((a, b) =>
    a.id.localeCompare(b.id),
  )

  const csvContent = toCsvFromRecord(sortedRecords, ["id", "description"])

  const outputPath = `${process.cwd()}/${config.root}/sheets/mutations.csv`

  await fs.writeFile(outputPath, csvContent)

  console.log(`CSV file has been written to ${outputPath}\n`)
}

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
