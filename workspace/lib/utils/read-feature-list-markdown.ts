import { readCsvRecords } from "~/lib/utils/read-csv-records"

/**
 * 優先度の高い機能をマークダウンに変換する
 */
export async function readFeatureListMarkdown() {
  const features = await readCsvRecords("features.csv", [
    "path",
    "priority",
    "name",
    "description",
  ])

  let markdown = ""

  const highPriorityFeatures = features.filter((feature) => {
    return feature.priority === "0"
  })

  for (const feature of highPriorityFeatures) {
    markdown += `- ${feature.name}: ${feature.description}`
    markdown += "\n"
  }

  return markdown.trim()
}
