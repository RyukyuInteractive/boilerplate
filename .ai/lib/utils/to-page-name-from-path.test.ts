import { expect, test } from "bun:test"
import { toPageNameFromPath } from "./to-page-name-from-path"

test("ルートパスをホームに変換する", () => {
  expect(toPageNameFromPath("/")).toBe("ホーム")
})

test("通常のパスを表示名に変換する", () => {
  expect(toPageNameFromPath("/my/account")).toBe("Account")
  expect(toPageNameFromPath("/users/settings")).toBe("Settings")
})

test("動的パラメータを含むパスを表示名に変換する", () => {
  expect(toPageNameFromPath("/projects/:projectId")).toBe("Project id")
  expect(toPageNameFromPath("/users/:userId/profile")).toBe("Profile")
})

test("キャメルケースのパスを適切に変換する", () => {
  expect(toPageNameFromPath("/userSettings")).toBe("User settings")
  expect(toPageNameFromPath("/teamMembers")).toBe("Team members")
})
