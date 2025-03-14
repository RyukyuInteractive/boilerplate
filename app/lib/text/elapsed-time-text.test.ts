import { expect, test } from "bun:test"
import { elapsedTimeText } from "./elapsed-time-text"

test("現在時刻の30秒前は「今」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 30
  expect(elapsedTimeText(timestamp)).toBe("今")
})

test("現在時刻の5分前は「5分前」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 300
  expect(elapsedTimeText(timestamp)).toBe("5分前")
})

test("現在時刻の2時間前は「2時間前」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 7200
  expect(elapsedTimeText(timestamp)).toBe("2時間前")
})

test("現在時刻の3日前は「3日前」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 259200
  expect(elapsedTimeText(timestamp)).toBe("3日前")
})

test("現在時刻の2ヶ月前は「2ヶ月前」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 5184000
  expect(elapsedTimeText(timestamp)).toBe("2ヶ月前")
})

test("現在時刻の1年前は「1年前」と表示する", () => {
  const now = Math.floor(Date.now() / 1000)
  const timestamp = now - 31536000
  expect(elapsedTimeText(timestamp)).toBe("1年前")
})
