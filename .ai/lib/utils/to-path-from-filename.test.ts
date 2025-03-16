import { expect, test } from "bun:test"
import { toPathFromFilename } from "./to-path-from-filename"

test("ルートパスに変換する", () => {
  expect(toPathFromFilename("_main.index.tsx")).toBe("/")
  expect(toPathFromFilename("index.tsx")).toBe("/")
})

test("通常のパスに変換する", () => {
  expect(toPathFromFilename("_main.my.account.tsx")).toBe("/my/account")
  expect(toPathFromFilename("about.contact.tsx")).toBe("/about/contact")
})

test("動的パラメータを含むパスに変換する", () => {
  expect(toPathFromFilename("$project.logs.$log.tsx")).toBe(
    "/:project/logs/:log",
  )
  expect(toPathFromFilename("users.$id.profile.tsx")).toBe("/users/:id/profile")
})

test("複合的なケースを正しく変換する", () => {
  expect(toPathFromFilename("_main.teams.$teamId.members.$memberId.tsx")).toBe(
    "/teams/:teamId/members/:memberId",
  )
  expect(toPathFromFilename("_main.api.$version.docs.index.tsx")).toBe(
    "/api/:version/docs",
  )
})
