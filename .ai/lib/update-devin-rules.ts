import config from "../config.json"
import { readTextFile } from "./utils/read-text-file"
import { writeTextFile } from "./utils/write-text-file"

export async function updateDevinRules() {
  let markdown = ""

  const instructions = [
    config.instructions.output,
    config.instructions.product,
    config.instructions.memory,
    config.instructions.code,
    config.instructions.test,
    config.instructions.directories,
    config.instructions.libraries,
    config.instructions.commands,
    config.instructions.methods,
    config.instructions.tips,
  ]

  for (const path of instructions) {
    if (path === null) continue
    markdown += await readTextFile(path)
    markdown += "\n\n"
  }

  markdown = `${markdown.trim()}\n`

  await writeTextFile(markdown, config.output.devinrules)
}
