import { Glob } from "bun"
import { extractFrontmatter } from "./extract-frontmatter"

type CursorRule = ReturnType<typeof extractFrontmatter> & {
  path: string
}

export async function readMdcRules(rulesPath: string): Promise<CursorRule[]> {
  const glob = new Glob("*.mdc")

  const rules: CursorRule[] = []

  for await (const file of glob.scan(rulesPath)) {
    const path = `${rulesPath}/${file}`
    const content = await Bun.file(path).text()
    const frontmatter = extractFrontmatter(content)
    if (frontmatter.alwaysApply === "true") continue
    rules.push({ ...frontmatter, path: path })
  }

  return rules
}
