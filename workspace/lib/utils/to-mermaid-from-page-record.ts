import {
  analyzePathRelationships,
  generateNodeId,
} from "./analyze-path-relationships"

type Page = {
  path: string
  name: string
}

/**
 * ページをMermaid図に変換する
 */
export function toMermaidFromPageRecord(pages: Page[]) {
  let mermaid = "flowchart LR\n"

  // ルートノードを定義（存在しない場合）
  if (!pages.some((p) => p.path === "/")) {
    mermaid += `  root["ホーム<br/><small>/</small>"]\n`
  }

  // ノード定義
  for (const page of pages) {
    const nodeId = generateNodeId(page.path)
    mermaid += `  ${nodeId}["${page.name}<br/><small>${page.path}</small>"]\n`
  }

  mermaid += "\n"

  // 関係を定義
  const relationships = analyzePathRelationships(
    pages.map((p) => {
      return {
        name: p.name,
        path: p.path,
      }
    }),
  )
  for (const [parent, children] of relationships.entries()) {
    for (const child of children) {
      mermaid += `  ${parent} --> ${child}\n`
    }
  }

  return mermaid
}
