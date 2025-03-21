import { sortFeatureCsv } from "./sort-features-csv"
import { updateClinerules } from "./update-clinerules"
import { updateCopilotInstructions } from "./update-copilot-instructions"
import { updateCursorRules } from "./update-cursor-rules"
import { updatePagesCsv } from "./update-pages-csv"
import { updateProductMarkdown } from "./update-product-markdown"
import { updateVscodeSettings } from "./update-vscode-settings"

await updatePagesCsv()
await sortFeatureCsv()
await updateProductMarkdown()
await updateVscodeSettings()
await updateCopilotInstructions()
await updateClinerules()
await updateCursorRules()
