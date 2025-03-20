export async function readTextFileSafe(
  ...filePath: string[]
): Promise<string | null> {
  try {
    const contentPath = `${process.cwd()}/${filePath.join("/")}`

    const content = await Bun.file(contentPath).text()

    return content.replace(/\n{3,}/g, "\n\n").trim()
  } catch {
    return null
  }
}
