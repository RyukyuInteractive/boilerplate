import fs from "node:fs/promises"

export async function readFileText(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf8")
  return content.replace(/\n{3,}/g, "\n\n").trim()
}
