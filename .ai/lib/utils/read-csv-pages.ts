import { type InferInput, parse } from "valibot"
import { config } from "../../config"
import { vPage } from "../validations/page"
import { readCsvRecords } from "./read-csv-records"

type RecordType = InferInput<typeof vPage>

/**
 * CSVからページ情報を読み込む
 */
export async function readCsvPages(): Promise<Map<string, RecordType>> {
  const csvRecords = await readCsvRecords(config.sheet.page.path, [
    "path",
    "name",
    "description",
    "is_deprecated",
    "deprecated_reason",
    "file",
  ])

  const map = new Map<string, RecordType>()

  for (const item of csvRecords) {
    const record = parse(vPage, {
      path: item.path,
      name: item.name,
      description: item.description,
      is_deprecated: item.is_deprecated === "true",
      deprecated_reason: item.deprecated_reason || "",
      file: item.file || "",
    } satisfies RecordType)
    map.set(record.path, record)
  }

  return map
}
