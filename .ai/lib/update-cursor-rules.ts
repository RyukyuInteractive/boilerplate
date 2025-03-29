import config from "../config.json"
import { createFrontmatter } from "./utils/create-frontmatter"
import { readTextFile } from "./utils/read-text-file"
import { readTextFiles } from "./utils/read-text-files"
import { writeTextFile } from "./utils/write-text-file"

export async function updateCursorRules() {
  const files = Object.values(config.instructions)

  let markdown = createFrontmatter({
    description: "Instructions",
    globs: "",
    alwaysApply: true,
  })

  markdown += "\n"

  for await (const file of files) {
    if (file === null) continue
    markdown += await readTextFile(file)
    markdown += "\n\n"
  }

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, config.output.cursorRules, "instructions.mdc")

  const rules = readTextFiles(config.input.rules)

  for await (const [path, text] of rules) {
    await writeTextFile(text, config.output.cursorRules, path)
  }
}
