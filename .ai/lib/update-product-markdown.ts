import { config } from "./config"
import { readPageListMarkdown } from "./utils/read-page-list-markdown"
import { readTextFile } from "./utils/read-text-file"
import { removeFrontmatter } from "./utils/remove-frontmatter"
import { writeTextFile } from "./utils/write-text-file"

export async function updateProductMarkdown() {
  const overview = await readTextFile(config.instructions.overview)

  let markdown = removeFrontmatter(overview)

  markdown += "\n\n"

  markdown += "# ページ"

  markdown += "\n\n"

  markdown += await readPageListMarkdown()

  markdown += "\n"

  await writeTextFile(markdown, config.path.productMarkdown)
}
