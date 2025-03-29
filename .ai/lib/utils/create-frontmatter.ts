type Props = {
  description: string
  globs: string
  alwaysApply: boolean
}

export function createFrontmatter(props: Props): string {
  return `---
description: ${props.description}
globs: ${props.globs}
alwaysApply: ${props.alwaysApply}
---`
}
