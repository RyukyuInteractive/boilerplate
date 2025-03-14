import fs from "node:fs/promises"
import path from "node:path"

export async function* readDirectoryTexts(directoryPath: string) {
  const files = await fs.readdir(directoryPath)
  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) continue
    const fileContent = await fs.readFile(filePath, "utf8")
    yield fileContent.trim()
  }
}
