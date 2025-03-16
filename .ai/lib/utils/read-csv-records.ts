import { config } from "../../config"
import { parseCsv } from "./parse-csv"

/**
 * CSVファイルから項目を読み込む
 */
export async function readCsvRecords<K extends string>(
  fileName: string,
  columns: K[],
): Promise<Record<K, string>[]> {
  const path = `${process.cwd()}/${config.root}/sheets/${fileName}`

  const data = await Bun.file(path).text()

  return parseCsv(data, columns)
}
