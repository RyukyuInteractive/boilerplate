// valibotは使わない
import { config } from "./config"
import type { FeatureType } from "./types/feature"
import { escapeText } from "./utils/escape-text"
import { readCsvRecords } from "./utils/read-csv-records"
import { writeTextFile } from "./utils/write-text-file"

export async function sortFeatureCsv() {
  const columns = [
    "path",
    "priority",
    "name",
    "description",
    "deprecated_reason",
  ] as const

  const features = await readCsvRecords(config.input.features, columns)

  const validFeatures: FeatureType[] = []

  for (const item of features) {
    const feature: FeatureType = {
      path: item.path,
      priority: Number.parseInt(item.priority, 10),
      name: item.name,
      description: item.description,
      deprecated_reason: item.deprecated_reason || null,
    }
    validFeatures.push(feature)
  }

  const sortedFeatures = [...validFeatures].sort((a, b) => {
    return a.path.localeCompare(b.path)
  })

  const header = columns.join(",")

  const rows = sortedFeatures.map((feature) => {
    return [
      escapeText(feature.path),
      escapeText(feature.priority.toString()),
      escapeText(feature.name),
      escapeText(feature.description),
      escapeText(feature.deprecated_reason || ""),
    ].join(",")
  })

  const content = `${[header, ...rows].join("\n").trim()}\n`

  await writeTextFile(content, config.input.features)
}
