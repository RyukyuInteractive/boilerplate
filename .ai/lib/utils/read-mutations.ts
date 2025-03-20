import fs from "node:fs/promises"
import { parse } from "valibot"
import { config } from "../config"
import { vMutation } from "../validations/mutation"
import { toCsvFromRecord } from "./to-csv-from-record"

export async function readMutations() {
  const draftMap = new Map()

  const fileDirectory = `${process.cwd()}/${config.projectDirectories.apiMutations}`

  const glob = new Bun.Glob("*.ts")

  for await (const filename of glob.scan(fileDirectory)) {
    const path = `${fileDirectory}/${filename}`

    const id = generateIdFromFilename(filename)

    const content = await fs.readFile(path, "utf8")

    const description = extractDescriptionFromContent(content)

    draftMap.set(
      id,
      parse(vMutation, {
        id,
        description: description,
      }),
    )
  }

  const records = Array.from(draftMap.values())

  const sortedRecords = [...records].toSorted((a, b) => {
    return a.id.localeCompare(b.id)
  })

  return toCsvFromRecord(sortedRecords, ["id", "description"])
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
