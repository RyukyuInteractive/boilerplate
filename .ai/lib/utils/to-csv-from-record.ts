/**
 * Record => string
 */
export function toCsvFromRecord<T extends Record<string, unknown>>(
  items: T[],
  headers: string[],
): string {
  const headerRow = headers.join(",")

  const rows = items.map((item) => {
    const values = headers.map((header) => {
      const value = item[header]

      if (typeof value === "string") {
        return `"${value.replace(/"/g, '""')}"`
      }

      return String(value)
    })

    return values.join(",")
  })

  return [headerRow, ...rows].join("\n")
}
