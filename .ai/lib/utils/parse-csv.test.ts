import { expect, test } from "bun:test"
import { parseCsv } from "./parse-csv"

test("空のCSV文字列の場合は空の配列を返す", async () => {
  const result = parseCsv("", ["name", "age"])
  expect(result).toEqual([])
})

test("ヘッダー行のみの場合は空の配列を返す", async () => {
  const result = parseCsv("name,age", ["name", "age"])
  expect(result).toEqual([])
})

test("基本的なCSVデータを正しく解析する", async () => {
  const csv = `name,age
Alice,30
Bob,25`

  const result = parseCsv(csv, ["name", "age"])
  expect(result).toEqual([
    { name: "Alice", age: "30" },
    { name: "Bob", age: "25" },
  ])
})

test("ヘッダーと実際のデータ列の順序が異なる場合も正しく解析する", async () => {
  const csv = `age,name
30,Alice
25,Bob`

  const result = parseCsv(csv, ["name", "age"])
  expect(result).toEqual([
    { name: "Alice", age: "30" },
    { name: "Bob", age: "25" },
  ])
})

test("指定されたキーがヘッダーに存在しない場合は空の文字列を設定する", async () => {
  const csv = `name
Alice
Bob`

  const result = parseCsv(csv, ["name", "age"])
  expect(result).toEqual([
    { name: "Alice", age: "" },
    { name: "Bob", age: "" },
  ])
})

test("クォーテーションで囲まれたフィールドを正しく処理する", async () => {
  const csv = `name,description
"Alice","She is nice"
"Bob","He is ""awesome"""`

  const result = parseCsv(csv, ["name", "description"])
  expect(result).toEqual([
    { name: "Alice", description: "She is nice" },
    { name: "Bob", description: 'He is "awesome"' },
  ])
})

test("フィールド内のカンマを正しく処理する", async () => {
  const csv = `name,items
"Alice","apple, banana, orange"
Bob,apple`

  const result = parseCsv(csv, ["name", "items"])
  expect(result).toEqual([
    { name: "Alice", items: "apple, banana, orange" },
    { name: "Bob", items: "apple" },
  ])
})

test("単純なCSVを正しくパースする", async () => {
  const csv = "id,name,age\n1,Alice,20\n2,Bob,25"
  const result = parseCsv(csv, ["id", "name", "age"])

  expect(result).toEqual([
    { id: "1", name: "Alice", age: "20" },
    { id: "2", name: "Bob", age: "25" },
  ])
})

test("ダブルクォートで囲まれた値を正しく処理する", async () => {
  const csv = `id,name,description\n1,"Alice, Smith","Description with ""quotes"""\n2,Bob,"Multiple\nLines"`
  const result = parseCsv(csv, ["id", "name", "description"])

  expect(result).toEqual([
    { id: "1", name: "Alice, Smith", description: 'Description with "quotes"' },
    { id: "2", name: "Bob", description: "Multiple\nLines" },
  ])
})

test("指定されたキーのみを抽出する", async () => {
  const csv =
    "id,name,age,email\n1,Alice,20,alice@test.com\n2,Bob,25,bob@test.com"
  const result = parseCsv(csv, ["id", "name"])

  expect(result).toEqual([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ])
})

test("存在しないキーは空文字列として扱う", async () => {
  const csv = "id,name\n1,Alice\n2,Bob"
  const result = parseCsv(csv, ["id", "name", "age"])

  expect(result).toEqual([
    { id: "1", name: "Alice", age: "" },
    { id: "2", name: "Bob", age: "" },
  ])
})

test("空のCSVは空配列を返す", async () => {
  const csv = ""
  const result = parseCsv(csv, ["id", "name"])
  expect(result).toEqual([])
})

test("末尾の改行を適切に処理する", async () => {
  const csv = "id,name\n1,Alice\n2,Bob\n"
  const result = parseCsv(csv, ["id", "name"])

  expect(result).toEqual([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ])
})
