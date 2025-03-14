import fs from "node:fs/promises"
import path from "node:path"
import { readFeatureListMarkdown } from "~/lib/utils/read-feature-list-markdown"
import { readFileText } from "~/lib/utils/read-file-text"
import { readMutationListMarkdown } from "~/lib/utils/read-mutation-list-markdown"
import { readPageListMarkdown } from "~/lib/utils/read-page-list-markdown"

let markdown = "※ このページは自動生成されました。手動で編集しないでください。"

markdown += "\n\n"

markdown += "# 主要な機能"

markdown += "\n\n"

markdown += await readFeatureListMarkdown()

markdown += "\n\n"

markdown += "# ページ"

markdown += "\n\n"

markdown += await readPageListMarkdown()

markdown += "\n\n"

markdown += await readFileText("features.md")

markdown += "# API"

markdown += "\n\n"

markdown += await readMutationListMarkdown()

markdown += "\n"

process.stdout.write("製品の仕様書を生成しました:\n")

const outputPath = path.resolve(import.meta.dir, "..", "..", "product.md")

await fs.writeFile(outputPath, markdown, "utf8")

process.stdout.write(`- ${outputPath}`)

process.stdout.write("\n")
