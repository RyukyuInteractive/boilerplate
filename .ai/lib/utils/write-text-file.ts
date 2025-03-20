export async function writeTextFile(
  content: string,
  ...filePath: string[]
): Promise<null> {
  const contentPath = `${process.cwd()}/${filePath.join("/")}`

  await Bun.write(contentPath, content)

  return null
}
