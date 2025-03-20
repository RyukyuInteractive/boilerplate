import { config } from "./config"
import { readTextFile } from "./utils/read-text-file"
import { writeTextFile } from "./utils/write-text-file"

export async function updateVscodeSettings() {
  const settingsJson = await readTextFile(config.path.vscodeSettings)

  const settings = {
    ...JSON.parse(settingsJson),
    "github.copilot.chat.commitMessageGeneration.instructions": [
      { file: `${config.path.copilotInstructionsCommitMessageGeneration}` },
    ],
    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
      {
        file: `${config.path.copilotInstructionsPullRequestDescriptionGeneration}`,
      },
    ],
    "github.copilot.chat.reviewSelection.instructions": [
      { file: `${config.path.copilotInstructionsReviewSelection}` },
    ],
    "github.copilot.chat.testGeneration.instructions": [
      { file: `${config.path.copilotInstructionsTestGeneration}` },
    ],
  }

  const text = `${JSON.stringify(settings, null, 2)}\n`

  await writeTextFile(text, config.path.vscodeSettings)
}
