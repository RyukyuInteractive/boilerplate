import { config } from "./config"
import { createRulesInstructions } from "./utils/create-rules-instruction"
import { readTextFile } from "./utils/read-text-file"
import { removeFrontmatter } from "./utils/remove-frontmatter"
import { writeTextFile } from "./utils/write-text-file"

export async function updateClinerules() {
  let markdown = ""

  markdown += await createRulesInstructions()

  markdown += "\n"

  const instructions = [
    config.instructions.output,
    config.instructions.overview,
    config.instructions.workflow,
    config.instructions.memory,
    config.instructions.code,
    config.instructions.test,
    config.instructions.directories,
    config.instructions.libraries,
    config.instructions.commands,
    config.instructions.methods,
    config.instructions.commitMessage,
    config.instructions.pullRequestDescription,
    config.instructions.review,
    config.instructions.test,
  ]

  for (const path of instructions) {
    const content = await readTextFile(path)
    markdown += removeFrontmatter(content)
    markdown += "\n\n"
  }

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, ".clinerules")
}
