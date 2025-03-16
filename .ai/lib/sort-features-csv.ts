import fs from "node:fs/promises"
import { type InferInput, parse } from "valibot"
import { config } from "../config"
import { readCsvRecords } from "./utils/read-csv-records"
import { vFeature } from "./validations/feature"

export async function sortFeatureCsv() {
  type FeatureType = InferInput<typeof vFeature>

  const features = await readCsvRecords("features.csv", [
    "path",
    "priority",
    "name",
    "description",
    "deprecated_reason",
  ])

  const validFeatures: FeatureType[] = []

  for (const item of features) {
    const feature = parse(vFeature, {
      path: item.path,
      // バリデーション時にpriority文字列を数値に変換
      priority: Number.parseInt(item.priority, 10),
      name: item.name,
      description: item.description,
      deprecated_reason: item.deprecated_reason || null,
    } satisfies FeatureType)
    validFeatures.push(feature)
  }

  const sortedFeatures = [...validFeatures].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority
    }
    return a.path.localeCompare(b.path)
  })

  /**
   * ヘッダー
   */
  const headers = [
    "path",
    "priority",
    "name",
    "description",
    "deprecated_reason",
  ]

  const headerRow = headers.join(",")

  /**
   * 行データ
   */
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

  const content = [headerRow, ...rows].join("\n")

  const path = `${process.cwd()}/${config.root}/sheets/features.csv`

  await fs.writeFile(path, content)

  console.log(`Features CSV file has been sorted and written to ${path}`)
}
