export function parseCsv<K extends string>(
  content: string,
  keys: readonly K[],
): Record<K, string>[] {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean) // 空行を除去
  if (lines.length <= 1) {
    return []
  }

  const headerLine = lines[0]
  const headers = parseCsvLine(headerLine)
  const result: Record<K, string>[] = []

  let buffer = ""
  for (const line of lines.slice(1)) {
    buffer += (buffer ? "\n" : "") + line
    if (countQuotes(buffer) % 2 === 0) {
      const values = parseCsvLine(buffer)
      const item = {} as Record<K, string>
      for (const key of keys) {
        const index = headers.indexOf(key)
        item[key] = index !== -1 && index < values.length ? values[index] : ""
      }
      result.push(item)
      buffer = ""
    }
  }

  return result
}

function countQuotes(str: string): number {
  return (str.match(/"/g) || []).length
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let currentField = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = i < line.length - 1 ? line[i + 1] : null

    if (char === '"') {
      if (!inQuotes) {
        inQuotes = true
      } else if (nextChar === '"') {
        currentField += '"'
        i++
      } else {
        inQuotes = false
      }
      continue
    }

    if (char === "," && !inQuotes) {
      fields.push(currentField)
      currentField = ""
      continue
    }

    currentField += char
  }

  fields.push(currentField)

  return fields.map((field) => field.trim())
}
