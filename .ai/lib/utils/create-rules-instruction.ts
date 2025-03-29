import { readMdcRules } from "./read-mdc-rules"

type Props = {
  rulesPath: string
}

export async function createRulesInstructions(props: Props) {
  let markdown = "# ファイル読み込み\n\n"

  markdown += "コードを生成する場合は以下のルールに従います。\n"

  markdown +=
    "対象が、以下のうちの「description」または「globs」のどちらかに一致する場合はそのファイルの指示を読んで従います。\n"

  markdown += "\n"

  const rules = await readMdcRules(props.rulesPath)

  for (const rule of rules) {
    markdown += `- \`${rule.path}\`\n`
    markdown += `  - description: ${rule.description}\n`
    markdown += `  - globs: \`${rule.globs}\`\n`
    markdown += "\n"
  }

  return `${markdown.trim()}\n`
}
