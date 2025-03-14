import { expect, test } from "bun:test"
import { toMermaidFromPageRecord } from "./to-mermaid-from-page-record"

test("ページ情報をMermaid図に変換する", () => {
  const pages = [
    { path: "/", name: "ホーム" },
    { path: "/users", name: "ユーザー一覧" },
    { path: "/users/new", name: "新規ユーザー" },
  ]

  const result = toMermaidFromPageRecord(pages)

  expect(result).toContain("flowchart LR")
  expect(result).toContain(`root["ホーム<br/><small>/</small>"]`)
  expect(result).toContain(`_users["ユーザー一覧<br/><small>/users</small>"]`)
  expect(result).toContain(
    `_users_new["新規ユーザー<br/><small>/users/new</small>"]`,
  )
  expect(result).toContain("root --> _users")
  expect(result).toContain("_users --> _users_new")
})

test("空のページ一覧からMermaid図を生成する", () => {
  const pages: Array<{ path: string; name: string }> = []

  const result = toMermaidFromPageRecord(pages)

  expect(result).toContain("flowchart LR")
  expect(result).toContain(`root["ホーム<br/><small>/</small>"]`)
})

test("動的パラメータを含むパスを適切に変換する", () => {
  const pages = [
    { path: "/", name: "ホーム" },
    { path: "/projects/:id", name: "プロジェクト詳細" },
    { path: "/projects/:id/settings", name: "プロジェクト設定" },
  ]

  const result = toMermaidFromPageRecord(pages)

  expect(result).toContain(
    `_projects_p_id["プロジェクト詳細<br/><small>/projects/:id</small>"]`,
  )
  expect(result).toContain(
    `_projects_p_id_settings["プロジェクト設定<br/><small>/projects/:id/settings</small>"]`,
  )
  expect(result).toContain("_projects --> _projects_p_id")
  expect(result).toContain("_projects_p_id --> _projects_p_id_settings")
})
