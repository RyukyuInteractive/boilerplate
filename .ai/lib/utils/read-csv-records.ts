import { parseCsv } from "./parse-csv"

export async function readCsvRecords<K extends string>(
  fileName: string,
  columns: readonly K[],
): Promise<Record<K, string>[]> {
  const path = `${process.cwd()}/${fileName}`

  const data = await Bun.file(path).text()

  return parseCsv(data, columns)
}
