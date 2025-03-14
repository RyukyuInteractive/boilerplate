import { readCsvRecords } from "~/lib/utils/read-csv-records"

/**
 * ページのマークダウン表現を生成する
 */
export async function readPageFeatureListMarkdown(pagePath: string) {
  const features = await readCsvRecords("features.csv", [
    "path",
    "priority",
    "name",
    "description",
  ])

  const pageFeatures = features.filter((feature) => {
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
