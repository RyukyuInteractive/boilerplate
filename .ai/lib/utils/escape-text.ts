export function escapeText(text: string) {
  return `"${text.replace(/"/g, '""')}"`
}
