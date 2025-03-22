import { sortFeatureCsv } from "./sort-features-csv"
import { updateCopilotInstructions } from "./update-copilot-instructions"
import { updateCursorRules } from "./update-cursor-rules"
import { updateRules } from "./update-rules"
import { updateVscodeSettings } from "./update-vscode-settings"

await sortFeatureCsv()
await updateCopilotInstructions()
await updateRules()
await updateCursorRules()
await updateVscodeSettings()
