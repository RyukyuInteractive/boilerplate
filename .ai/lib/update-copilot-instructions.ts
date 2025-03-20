import { config } from "./config"
import { createRulesInstructions } from "./utils/create-rules-instruction"
import { readTextFile } from "./utils/read-text-file"
import { removeFrontmatter } from "./utils/remove-frontmatter"
import { writeTextFile } from "./utils/write-text-file"

export async function updateCopilotInstructions() {
  let markdown = ""

  const rules = Object.values([
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
  ])

  for (const path of rules) {
    const content = await readTextFile(path)
    markdown += removeFrontmatter(content)
    markdown += "\n\n"
  }

  markdown += await createRulesInstructions()

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, ".github/copilot-instructions.md")

  const instructions = [
    {
      path: config.path.copilotInstructionsCommitMessageGeneration,
      files: [config.instructions.commitMessage],
    },
    {
      path: config.path.copilotInstructionsPullRequestDescriptionGeneration,
      files: [config.instructions.pullRequestDescription],
    },
    {
      path: config.path.copilotInstructionsReviewSelection,
      files: [config.instructions.review],
    },
    {
      path: config.path.copilotInstructionsTestGeneration,
      files: [config.instructions.test],
    },
  ]

  for (const instruction of instructions) {
    const rules = Object.values(instruction.files)

    let markdown = ""

    for (const path of rules) {
      const content = await readTextFile(path)
      markdown += removeFrontmatter(content)
      markdown += "\n\n"
    }

    markdown = `${markdown.trim()}\n`

    await writeTextFile(markdown, instruction.path)
  }
}
