/**
 * CSV => Map<string, T>
 */
export function toCsvFromMap<T extends Record<string, unknown>>(
  dataMap: Map<string, T>,
  columns: Array<keyof T>,
): string {
  const headerRow = columns.join(",")

  // 各行のデータを作成
  const rows = Array.from(dataMap.values()).map((data) => {
    const rowValues = columns.map((column) => {
      const value = data[column]
      const stringValue = String(value ?? "")
      // CSVでは、ダブルクォーテーションの中にダブルクォーテーションがある場合は、
      // ダブルクォーテーションを二つ連続させてエスケープする
      return `"${stringValue.replace(/"/g, '""')}"`
    })

    return rowValues.join(",")
  })

  // ヘッダーと行を結合
  return [headerRow, ...rows].join("\n")
}
