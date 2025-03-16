import { type InferInput, parse } from "valibot"
import { vMutation } from "../validations/mutation"
import { readCsvRecords } from "./read-csv-records"

type RecordType = InferInput<typeof vMutation>

/**
 * CSVファイルを読み込み、API情報の配列に変換する
 */
export async function readCsvMutations() {
  const csvRecords = await readCsvRecords("mutations.csv", [
    "id",
    "description",
  ])

  const map = new Map<string, InferInput<typeof vMutation>>([])

  for (const item of csvRecords) {
    const record = parse(vMutation, {
      id: item.id,
      description: item.description,
    } satisfies RecordType)
    map.set(item.id, record)
  }

  return map
}
