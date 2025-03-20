import fs from "node:fs/promises"

export async function* readTextFiles(...paths: string[]) {
  const directoryPath = [process.cwd(), ...paths].join("/")

  const files = await fs.readdir(directoryPath)

  for (const file of files) {
    const filePath = `${directoryPath}/${file}`

    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) continue

    const text = await Bun.file(filePath).text()

    const content = `${text.trim()}\n`

    yield [file, content] as const
  }
}
