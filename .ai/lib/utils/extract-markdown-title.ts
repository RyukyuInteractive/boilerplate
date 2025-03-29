export function extractMarkdownTitle(text: string): string | null {
  const match = text.match(/^# (.+)$/m)

  return match ? match[1] : null
}
