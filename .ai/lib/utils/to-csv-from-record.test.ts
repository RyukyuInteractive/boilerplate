import { expect, test } from "bun:test"
import { toCsvFromRecord } from "./to-csv-from-record"

test("レコードの配列をCSV文字列に変換する", () => {
  const records = [
    { name: "Alice", age: 20 },
    { name: "Bob", age: 25 },
  ]

  const result = toCsvFromRecord(records, ["name", "age"])
  expect(result).toBe('name,age\n"Alice",20\n"Bob",25')
})

test("特殊文字が含まれる場合は適切にエスケープする", () => {
  const records = [
    { name: 'John "The Rock" Smith', description: "Line 1\nLine 2" },
    { name: "Jane, Doe", description: "Normal text" },
  ]

  const result = toCsvFromRecord(records, ["name", "description"])
  expect(result).toBe(
    'name,description\n"John ""The Rock"" Smith","Line 1\nLine 2"\n"Jane, Doe","Normal text"',
  )
})

test("指定したヘッダーの順序を維持する", () => {
  const records = [
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 25 },
  ]

  const result = toCsvFromRecord(records, ["name", "age", "id"])
  expect(result).toBe('name,age,id\n"Alice",20,1\n"Bob",25,2')
})

test("空の配列からCSVヘッダーのみを生成する", () => {
  const records: Array<{ name: string; age: number }> = []

  const result = toCsvFromRecord(records, ["name", "age"])
  expect(result).toBe("name,age")
})

test("nullやundefinedを文字列に変換する", () => {
  const records = [
    { name: "Alice", value: null },
    { name: "Bob", value: undefined },
  ]

  const result = toCsvFromRecord(records, ["name", "value"])
  expect(result).toBe('name,value\n"Alice",null\n"Bob",undefined')
})
