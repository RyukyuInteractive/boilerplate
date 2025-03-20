type Page = {
  path: string
  name: string
}

/**
 * パスの関係構造を分析する
 * 親子関係を特定する
 */
export function analyzePathRelationships(pages: Page[]): Map<string, string[]> {
  const relationships = new Map<string, string[]>()

  // パスの深さでソート
  const sortedPages = [...pages].sort((a, b) => {
    return splitPath(a.path).length - splitPath(b.path).length
  })

  // ルートノードを追加
  relationships.set("root", [])

  for (const page of sortedPages) {
    const nodeId = generateNodeId(page.path)
    if (!relationships.has(nodeId)) {
      relationships.set(nodeId, [])
    }

    // 親パスを見つける
    const segments = splitPath(page.path)
    if (segments.length === 0) {
      // ルートページは既に処理済み
      continue
    }

    // 親パスを作成
    const parentSegments = segments.slice(0, -1)
    const parentPath = `/${parentSegments.join("/")}`
    const parentId = generateNodeId(parentPath) || "root"

    // 親の子リストに追加
    const parentChildren = relationships.get(parentId) || []
    if (!parentChildren.includes(nodeId)) {
      parentChildren.push(nodeId)
      relationships.set(parentId, parentChildren)
    }
  }

  return relationships
}

export function generateNodeId(path: string): string {
  if (path === "" || path === "/") {
    return "root"
  }

  return path.replace(/^\/?/, "_").replace(/\//g, "_").replace(/:/g, "p_")
}

export function splitPath(path: string): string[] {
  return path.split("/").filter((segment) => segment !== "")
}
