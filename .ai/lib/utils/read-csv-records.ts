import { parseCsv } from "./parse-csv"

/**
 * CSVファイルから項目を読み込む
 */
export async function readCsvRecords<K extends string>(
  fileName: string,
  columns: readonly K[],
): Promise<Record<K, string>[]> {
  const path = `${process.cwd()}/${fileName}`

  const data = await Bun.file(path).text()

  return parseCsv(data, columns)
}
