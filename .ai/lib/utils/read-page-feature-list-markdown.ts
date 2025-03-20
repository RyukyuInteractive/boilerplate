import { config } from "../config"
import { readCsvRecords } from "./read-csv-records"

/**
 * ページのマークダウン表現を生成する
 */
export async function readPageFeatureListMarkdown(pagePath: string) {
  const features = await readCsvRecords(config.path.features, [
    "path",
    "priority",
    "name",
    "description",
    "deprecated_reason",
  ])

  const pageFeatures = features.filter((feature) => {
    if (feature.deprecated_reason.length !== 0) {
      return false
    }

    if (1 < Number.parseInt(feature.priority)) {
      return false
    }

    return feature.path === pagePath
  })

  if (pageFeatures.length === 0) {
    return ""
  }

  let markdown = ""

  for (const feature of pageFeatures) {
    markdown += `- ${feature.name}: ${feature.description}\n`
  }

  return markdown.trim()
}
