import fs from "node:fs/promises"

export async function readClineruleFileText<T extends boolean = false>(
  filePath: string,
): Promise<T extends true ? string | null : string> {
  const contentPath = `${process.cwd()}/.clinerules/${filePath}`

  const content = await fs.readFile(contentPath, "utf8")

  return content.replace(/\n{3,}/g, "\n\n").trim()
}
