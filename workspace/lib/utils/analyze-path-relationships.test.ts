import { expect, test } from "bun:test"
import {
  analyzePathRelationships,
  generateNodeId,
  splitPath,
} from "./analyze-path-relationships"

test("splitPath 関数が正しくパスをセグメントに分割する", () => {
  expect(splitPath("")).toEqual([])
  expect(splitPath("/")).toEqual([])
  expect(splitPath("/users")).toEqual(["users"])
  expect(splitPath("/users/profile")).toEqual(["users", "profile"])
  expect(splitPath("users/profile/settings")).toEqual([
    "users",
    "profile",
    "settings",
  ])
  expect(splitPath("/users//profile")).toEqual(["users", "profile"])
})

test("generateNodeId 関数が正しくノードIDを生成する", () => {
  expect(generateNodeId("")).toEqual("root")
  expect(generateNodeId("/")).toEqual("root")
  expect(generateNodeId("/users")).toEqual("_users")
  expect(generateNodeId("/users/profile")).toEqual("_users_profile")
  expect(generateNodeId("/users/:id")).toEqual("_users_p_id")
  expect(generateNodeId("/users/:id/edit")).toEqual("_users_p_id_edit")
})

test("analyzePathRelationships 関数が正しく親子関係を分析する", () => {
  const pages = [
    { path: "/", name: "ホーム" },
    { path: "/users", name: "ユーザー一覧" },
    { path: "/users/new", name: "ユーザー作成" },
    { path: "/users/:id", name: "ユーザー詳細" },
    { path: "/users/:id/edit", name: "ユーザー編集" },
    { path: "/settings", name: "設定" },
  ]

  const relationships = analyzePathRelationships(pages)

  // ルートノードの子ノード
  expect(relationships.get("root")).toEqual(["_users", "_settings"])

  // /users の子ノード
  expect(relationships.get("_users")).toContain("_users_new")
  expect(relationships.get("_users")).toContain("_users_p_id")
  expect(relationships.get("_users")?.length).toBe(2)

  // /users/:id の子ノード
  expect(relationships.get("_users_p_id")).toEqual(["_users_p_id_edit"])
})

test("analyzePathRelationships 関数がルートパスが存在しない場合も正しく動作する", () => {
  const pages = [
    { path: "/users", name: "ユーザー一覧" },
    { path: "/settings", name: "設定" },
  ]

  const relationships = analyzePathRelationships(pages)

  // ルートノードの子ノード
  expect(relationships.get("root")).toEqual(["_users", "_settings"])
})

test("analyzePathRelationships 関数が複雑なパス構造を正しく分析する", () => {
  const pages = [
    { path: "/", name: "ホーム" },
    { path: "/users", name: "ユーザー一覧" },
    { path: "/users/admins", name: "管理者一覧" },
    { path: "/users/admins/:id", name: "管理者詳細" },
    { path: "/organizations", name: "組織一覧" },
    { path: "/organizations/:id", name: "組織詳細" },
    { path: "/organizations/:id/members", name: "組織メンバー一覧" },
    { path: "/organizations/:id/members/:memberId", name: "組織メンバー詳細" },
  ]

  const relationships = analyzePathRelationships(pages)

  // ルートの子ノード
  expect(relationships.get("root")).toEqual(["_users", "_organizations"])

  // /users の子ノード
  expect(relationships.get("_users")).toEqual(["_users_admins"])

  // /users/admins の子ノード
  expect(relationships.get("_users_admins")).toEqual(["_users_admins_p_id"])

  // /organizations の子ノード
  expect(relationships.get("_organizations")).toEqual(["_organizations_p_id"])

  // /organizations/:id の子ノード
  expect(relationships.get("_organizations_p_id")).toEqual([
    "_organizations_p_id_members",
  ])

  // /organizations/:id/members の子ノード
  expect(relationships.get("_organizations_p_id_members")).toEqual([
    "_organizations_p_id_members_p_memberId",
  ])
})
