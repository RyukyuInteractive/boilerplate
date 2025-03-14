import fs from "node:fs/promises"
import { type InferInput, parse } from "valibot"
import { vFeature } from "./validations/feature"
import { readCsvRecords } from "~/lib/utils/read-csv-records"

type FeatureType = InferInput<typeof vFeature>

// 改良されたparseCsvを使ってCSVをパース
const features = await readCsvRecords("features.csv", [
  "path",
  "priority",
  "name",
  "description",
  "deprecated_reason",
])

// 機能情報の配列をバリデーション
const validFeatures: FeatureType[] = []

for (const item of features) {
  try {
    const feature = parse(vFeature, {
      path: item.path,
      // バリデーション時にpriority文字列を数値に変換
      priority: Number.parseInt(item.priority, 10),
      name: item.name,
      description: item.description,
      deprecated_reason: item.deprecated_reason || null,
    } satisfies FeatureType)
    validFeatures.push(feature)
  } catch (error) {
    console.warn(`Invalid feature data: ${JSON.stringify(item)}`)
  }
}

// 優先度でソート（優先度が低い順、同じ優先度の場合はパスでソート）
const sortedFeatures = [...validFeatures].sort((a, b) => {
  if (a.priority !== b.priority) {
    return a.priority - b.priority
  }
  return a.path.localeCompare(b.path)
})

// ヘッダーの定義
const headers = ["path", "priority", "name", "description", "deprecated_reason"]
const headerRow = headers.join(",")

// 行データの生成
const rows = sortedFeatures.map((feature) => {
  const escapedPath = `"${feature.path.replace(/"/g, '""')}"`
  const priority = `"${feature.priority}"`
  const escapedName = `"${feature.name.replace(/"/g, '""')}"`
  const escapedDescription = `"${feature.description.replace(/"/g, '""')}"`
  const escapedDeprecatedReason = feature.deprecated_reason
    ? `"${feature.deprecated_reason.replace(/"/g, '""')}"`
    : `""`

  return [
    escapedPath,
    priority,
    escapedName,
    escapedDescription,
    escapedDeprecatedReason,
  ].join(",")
})

// ヘッダーと行を結合してCSVを生成
const csvContent = [headerRow, ...rows].join("\n")

const csvPath = "sheets/features.csv"

// ファイルに書き込む
await fs.writeFile(csvPath, csvContent)

console.log(`Features CSV file has been sorted and written to ${csvPath}`)
