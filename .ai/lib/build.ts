import { sortFeatureCsv } from "./sort-features-csv"
import { updateInstructionsMarkdown } from "./update-instructions-markdown"
import { updateMutationsCsv } from "./update-mutations-csv"
import { updatePagesCsv } from "./update-pages-csv"
import { updatePagesMermaid } from "./update-pages-mermaid"
import { updateProductMarkdown } from "./update-product-markdown"

await updatePagesCsv()
await updatePagesMermaid()
await updateMutationsCsv()
await sortFeatureCsv()
await updateProductMarkdown()
await updateInstructionsMarkdown()
