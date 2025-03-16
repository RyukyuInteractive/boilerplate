import fs from "node:fs/promises"
import { config } from "../../config"

export async function readFileText(filePath: string): Promise<string> {
  const contentPath = `${process.cwd()}/${config.root}/${filePath}`

  const content = await fs.readFile(contentPath, "utf8")

  return content.replace(/\n{3,}/g, "\n\n").trim()
}
