import fs from "node:fs/promises"
import { config } from "../config"
import { readFeatureListMarkdown } from "./utils/read-feature-list-markdown"
import { readFileText } from "./utils/read-file-text"
import { readPageListMarkdown } from "./utils/read-page-list-markdown"

export async function updateProductMarkdown() {
  let markdown =
    "※ このページは自動生成されました。手動で編集しないでください。"

  markdown += "\n\n"

  markdown += "# 主要な機能"

  markdown += "\n\n"

  markdown += await readFeatureListMarkdown()

  markdown += "\n\n"

  markdown += "# ページ"

  markdown += "\n\n"

  markdown += await readPageListMarkdown()

  markdown += "\n\n"

  markdown += "# 機能"

  markdown += "\n\n"

  markdown += await readFileText("features.md")

  // {
  //   markdown += "\n\n"
  //   markdown += "# API"
  //   markdown += "\n\n"
  //   markdown += await readMutationListMarkdown()
  // }

  markdown += "\n"

  process.stdout.write("製品の仕様書を生成しました:\n")

  const path = `${process.cwd()}/${config.product.path}`

  await fs.writeFile(path, markdown, "utf8")

  process.stdout.write(`- ${path}`)

  process.stdout.write("\n")
}
