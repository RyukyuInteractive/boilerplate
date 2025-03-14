import { expect, test } from "bun:test"
import { toCsvFromMap } from "./to-csv-from-map"

test("Mapオブジェクトを有効なCSV文字列に変換する", () => {
  const testMap = new Map([
    ["key1", { id: 1, name: "テスト1", description: "説明1" }],
    ["key2", { id: 2, name: "テスト2", description: "説明2" }],
  ])

  const columns = ["id", "name", "description"] as const
  const result = toCsvFromMap(testMap, columns)

  const expectedCsv = `id,name,description\n"1","テスト1","説明1"\n"2","テスト2","説明2"`
  expect(result).toBe(expectedCsv)
})

test("空のMapを有効なCSVヘッダーのみの文字列に変換する", () => {
  const testMap = new Map()
  const columns = ["id", "name"] as const
  const result = toCsvFromMap(testMap, columns)

  expect(result).toBe("id,name")
})

test("特殊文字を含む値を適切にエスケープする", () => {
  const testMap = new Map([["key1", { id: 1, text: `text with "quotes"` }]])

  const columns = ["id", "text"] as const
  const result = toCsvFromMap(testMap, columns)

  const expectedCsv = `id,text\n"1","text with ""quotes"""`
  expect(result).toBe(expectedCsv)
})
