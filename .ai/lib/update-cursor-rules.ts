import { config } from "./config"
import { createMdcHeader } from "./utils/create-mdc-header"
import { readTextFile } from "./utils/read-text-file"
import { readTextFiles } from "./utils/read-text-files"
import { removeFrontmatter } from "./utils/remove-frontmatter"
import { writeTextFile } from "./utils/write-text-file"

export async function updateCursorRules() {
  const files = Object.values(config.instructions)

  let markdown = createMdcHeader({
    description: "Instructions",
    globs: "",
    alwaysApply: true,
  })

  markdown += "\n"

  for await (const file of files) {
    const content = await readTextFile(file)
    markdown += removeFrontmatter(content)
    markdown += "\n\n"
  }

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, config.output.cursorRules, "instructions.mdc")

  const rules = readTextFiles(config.input.rules)

  for await (const [path, text] of rules) {
    await writeTextFile(text, config.output.cursorRules, path)
  }
}
