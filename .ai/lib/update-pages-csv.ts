import fs from "node:fs/promises"
import { parse } from "valibot"
import { config } from "../config"
import { readCsvPages } from "./utils/read-csv-pages"
import { toCsvFromRecord } from "./utils/to-csv-from-record"
import { toPageNameFromPath } from "./utils/to-page-name-from-path"
import { toPathFromFilename } from "./utils/to-path-from-filename"
import { vPage } from "./validations/page"

export async function updatePagesCsv() {
  const currentMap = await readCsvPages()

  const draftMap = new Map(currentMap)

  const fileDirectory = `${process.cwd()}/${config.directories.appRoutes}`

  const glob = new Bun.Glob("*.tsx")

  const fileNames: string[] = []

  for await (const filePath of glob.scan(fileDirectory)) {
    fileNames.push(filePath)
  }

  const routeFiles = fileNames.filter((fileName) => {
    const lastSegment = fileName.split(".").pop()
    if (lastSegment?.startsWith("_")) return false
    if (fileName.endsWith("_root")) return false
    return true
  })

  for (const filePath of routeFiles) {
    const routePath = toPathFromFilename(filePath)

    const file = `${config.directories.appRoutes}/${filePath}`

    const existingPage = currentMap.get(routePath)

    if (existingPage === undefined) {
      draftMap.set(
        routePath,
        parse(vPage, {
          path: routePath,
          name: toPageNameFromPath(routePath),
          description: "",
          is_deprecated: false,
          deprecated_reason: "",
          file: file,
        }),
      )
      continue
    }

    draftMap.set(
      routePath,
      parse(vPage, {
        path: routePath,
        name: existingPage.name || toPageNameFromPath(routePath),
        description: existingPage.description || "",
        is_deprecated: existingPage.is_deprecated,
        deprecated_reason: existingPage.deprecated_reason || "",
        file: file,
      }),
    )
  }

  for (const [path, page] of currentMap.entries()) {
    if (draftMap.has(path)) continue
    draftMap.set(
      path,
      parse(vPage, {
        ...page,
        /**
         * ファイルが存在しない場合はtrueに設定
         */
        is_deprecated: true,
      }),
    )
  }

  const records = Array.from(draftMap.values())

  const sortedRecords = records.toSorted((a, b) => a.path.localeCompare(b.path))

  const csvContent = toCsvFromRecord(sortedRecords, [
    "path",
    "name",
    "description",
    "is_deprecated",
    "deprecated_reason",
    "file",
  ])

  const outputPath = `${process.cwd()}/${config.root}/sheets/${config.sheet.page.path}`

  await fs.writeFile(outputPath, csvContent)

  process.stdout.write(`pages.csv has been written to ${outputPath}\n`)
}
