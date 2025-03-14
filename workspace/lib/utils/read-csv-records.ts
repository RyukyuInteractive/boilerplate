import fs from "node:fs/promises"
import path from "node:path"
import { parseCsv } from "~/lib/utils/parse-csv"

/**
 * CSVファイルから項目を読み込む
 */
export async function readCsvRecords<K extends string>(
  fileName: string,
  columns: K[],
): Promise<Record<K, string>[]> {
  const filePath = path.join(import.meta.dir, "..", "..", "sheets", fileName)

  const data = await fs.readFile(filePath, "utf8")

  return parseCsv(data, columns)
}
