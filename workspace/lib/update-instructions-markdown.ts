import fs from "node:fs/promises"
import { readFileText } from "~/lib/utils/read-file-text"
import { readDirectoryTexts } from "./utils/read-directory-texts"
import path from "node:path"

let markdown = "# 応答"

markdown += "\n\n"

markdown += await readFileText("output.md")

markdown += "\n\n"

markdown += "# 製品概要"

markdown += "\n\n"

markdown += await readFileText("overview.md")

markdown += "\n\n"

for await (const text of readDirectoryTexts("projects")) {
  markdown += text
  markdown += "\n\n"
}

markdown += "## ディレクトリ構成\n\n"

markdown += await readFileText("directories.md")

markdown += "\n\n"

markdown += "## ライブラリ"

markdown += "\n\n"

markdown += await readFileText("libraries.md")

markdown += "\n\n"

markdown += "## コマンド"

markdown += "\n\n"

markdown += await readFileText("commands.md")

markdown += "\n\n"

markdown += "# 開発ケース"

markdown += "\n\n"

for await (const text of readDirectoryTexts("cases")) {
  markdown += text
  markdown += "\n\n"
}

markdown += "# サンプルコード"

markdown += "\n\n"

for await (const text of readDirectoryTexts("files")) {
  markdown += text
  markdown += "\n\n"
}

markdown += "# 開発"

markdown += "\n\n"

markdown += await readFileText("development.md")

markdown += "\n\n"

markdown += "# コード規約"

markdown += "\n\n"

markdown += await readFileText("code.md")

markdown += "\n"

process.stdout.write("製品の仕様書を生成しました:\n")

{
  const outputPath = path.resolve(import.meta.dir, "..", "..", ".clinerules")
  await fs.writeFile(outputPath, markdown, "utf8")
  process.stdout.write(`- ${outputPath}`)
}

process.stdout.write("\n")

{
  const outputPath = path.resolve(
    import.meta.dir,
    "..",
    "..",
    ".github",
    "copilot-instructions.md",
  )
  await fs.writeFile(outputPath, markdown, "utf8")
  process.stdout.write(`- ${outputPath}`)
}

process.stdout.write("\n")
