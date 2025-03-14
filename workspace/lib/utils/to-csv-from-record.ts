/**
 * Record => string
 */
export function toCsvFromRecord<T extends Record<string, unknown>>(
  items: T[],
  headers: string[],
): string {
  // ヘッダー行の作成
  const headerRow = headers.join(",")

  // 各行のデータを作成
  const rows = items.map((item) => {
    const values = headers.map((header) => {
      const value = item[header]

      // 文字列の場合はエスケープする
      if (typeof value === "string") {
        // CSVでは、ダブルクォーテーションの中にダブルクォーテーションがある場合は、
        // ダブルクォーテーションを二つ連続させてエスケープする
        return `"${value.replace(/"/g, '""')}"`
      }

      return String(value)
    })

    return values.join(",")
  })

  // ヘッダーと行を結合
  return [headerRow, ...rows].join("\n")
}
