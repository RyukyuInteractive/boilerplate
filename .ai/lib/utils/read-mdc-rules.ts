import { Glob } from "bun"
import { config } from "../config"
import { extractFrontmatter } from "./extract-frontmatter"

export type CursorRule = ReturnType<typeof extractFrontmatter> & {
  path: string
}

export async function readMdcRules(): Promise<CursorRule[]> {
  const glob = new Glob("*.mdc")

  const rules: CursorRule[] = []

  for await (const file of glob.scan(config.input.rules)) {
    const path = `${config.input.rules}/${file}`
    const content = await Bun.file(path).text()
    const frontmatter = extractFrontmatter(content)
    if (frontmatter.alwaysApply === "true") continue
    rules.push({ ...frontmatter, path: path })
  }

  return rules
}
