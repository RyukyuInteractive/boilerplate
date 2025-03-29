import config from "../config.json"
import { createRulesInstructions } from "./utils/create-rules-instruction"
import { readTextFile } from "./utils/read-text-file"
import { writeTextFile } from "./utils/write-text-file"

export async function updateCopilotInstructions() {
  let markdown = ""

  const rules = Object.values([
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
  ])

  for (const path of rules) {
    if (path === null) continue
    markdown += await readTextFile(path)
    markdown += "\n\n"
  }

  markdown += await createRulesInstructions({ rulesPath: config.input.rules })

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, config.output.copilotInstructions)

  const instructions = [
    {
      path: config.output.copilotInstructionsCommitMessageGeneration,
      files: [config.instructions.commitMessage],
    },
    {
      path: config.output.copilotInstructionsPullRequestDescriptionGeneration,
      files: [config.instructions.pullRequestDescription],
    },
    {
      path: config.output.copilotInstructionsReviewSelection,
      files: [config.instructions.review],
    },
    {
      path: config.output.copilotInstructionsTestGeneration,
      files: [config.instructions.test],
    },
  ]

  for (const instruction of instructions) {
    const rules = Object.values(instruction.files)

    let markdown = ""

    for (const path of rules) {
      markdown += await readTextFile(path)
      markdown += "\n\n"
    }

    markdown = `${markdown.trim()}\n`

    await writeTextFile(markdown, instruction.path)
  }
}
