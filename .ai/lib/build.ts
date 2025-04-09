import { updateCopilotInstructions } from "./update-copilot-instructions"
import { updateCursorRules } from "./update-cursor-rules"
import { updateDevinRules } from "./update-devin-rules"
import { updateRules } from "./update-rules"
import { updateVscodeSettings } from "./update-vscode-settings"

await updateCopilotInstructions()
await updateRules()
await updateCursorRules()
await updateVscodeSettings()
await updateDevinRules()
