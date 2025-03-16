import fs from "node:fs/promises"
import { config } from "../../config"

export async function* readDirectoryTexts(name: string) {
  const directoryPath = `${process.cwd()}/${config.root}/${name}`

  const files = await fs.readdir(directoryPath)

  for (const file of files) {
    const filePath = `${directoryPath}/${file}`

    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) continue

    const fileContent = await fs.readFile(filePath, "utf8")

    yield fileContent.trim()
  }
}
