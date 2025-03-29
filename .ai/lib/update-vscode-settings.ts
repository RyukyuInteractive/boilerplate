import config from "../config.json"
import { readTextFile } from "./utils/read-text-file"
import { writeTextFile } from "./utils/write-text-file"

export async function updateVscodeSettings() {
  const settingsJson = await readTextFile(".vscode", "settings.json")

  const settings = {
    ...JSON.parse(settingsJson),
    "github.copilot.chat.commitMessageGeneration.instructions": [
      {
        file: `${config.output.copilotInstructionsCommitMessageGeneration}`,
      },
    ],
    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
      {
        file: `${config.output.copilotInstructionsPullRequestDescriptionGeneration}`,
      },
    ],
    "github.copilot.chat.reviewSelection.instructions": [
      {
        file: `${config.output.copilotInstructionsReviewSelection}`,
      },
    ],
    "github.copilot.chat.testGeneration.instructions": [
      {
        file: `${config.output.copilotInstructionsTestGeneration}`,
      },
    ],
  }

  const text = `${JSON.stringify(settings, null, 2)}\n`

  await writeTextFile(text, ".vscode", "settings.json")
}
