/**
 * 経過時間を日本語のテキストに変換する
 * @param timestamp Unix timestamp (seconds)
 * @returns 日本語の経過時間テキスト
 */
export function elapsedTimeText(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = now - timestamp

  // 1分以内
  if (diff < 60) {
    return "今"
  }

  // 1時間以内
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `${minutes}分前`
  }

  // 24時間以内
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return `${hours}時間前`
  }

  // 30日以内
  if (diff < 2592000) {
    const days = Math.floor(diff / 86400)
    return `${days}日前`
  }

  // 12ヶ月以内
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000)
    return `${months}ヶ月前`
  }

  // それ以上
  const years = Math.floor(diff / 31536000)
  return `${years}年前`
}
