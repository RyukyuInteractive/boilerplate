import config from "../config.json"
import { createRulesInstructions } from "./utils/create-rules-instruction"
import { readTextFile } from "./utils/read-text-file"
import { writeTextFile } from "./utils/write-text-file"

export async function updateRules() {
  let markdown = ""

  markdown += await createRulesInstructions({ rulesPath: config.input.rules })

  markdown += "\n"

  const instructions = [
    config.instructions.output,
    config.instructions.workflow,
    config.instructions.overview,
    config.instructions.packages,
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
    if (path === null) continue
    markdown += await readTextFile(path)
    markdown += "\n\n"
  }

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, config.output.windsurfrules)

  await writeTextFile(markdown, config.output.clinerules)

  await writeTextFile(markdown, config.output.claude)
}
