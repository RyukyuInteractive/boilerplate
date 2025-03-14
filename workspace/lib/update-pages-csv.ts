import fs from "node:fs/promises"
import path from "node:path"
import { glob } from "glob"
import { parse } from "valibot"
import { toCsvFromRecord } from "~/lib/utils/to-csv-from-record"
import { toPageNameFromPath } from "~/lib/utils/to-page-name-from-path"
import { toPathFromFilename } from "~/lib/utils/to-path-from-filename"
import { vPage } from "~/lib/validations/page"
import { config } from "~/config"
import { readCsvPages } from "~/lib/utils/read-csv-pages"

const currentMap = await readCsvPages()

const draftMap = new Map(currentMap)

const fileDirectory = path.resolve(
  import.meta.dir,
  "..",
  "..",
  config.directories.appRoutes,
)

const files = glob.sync("*.tsx", {
  cwd: fileDirectory,
  absolute: true,
})

const routeFiles = files.filter((filePath) => {
  const filename = path.basename(filePath, ".tsx")
  const lastSegment = filename.split(".").pop()
  if (lastSegment?.startsWith("_")) return false
  if (filename.endsWith("_root")) return false
  return true
})

for (const filePath of routeFiles) {
  const filename = path.basename(filePath)

  const routePath = toPathFromFilename(filename)

  const relativePath = path.relative(fileDirectory, filePath)

  const normalizedPath = `${config.directories.appRoutes}/${relativePath.replace(/\\/g, "/")}`

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
        file: normalizedPath,
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
      file: normalizedPath,
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

const outputPath = path.resolve(process.cwd(), "sheets/pages.csv")

await fs.writeFile(outputPath, csvContent)

process.stdout.write(`pages.csv has been written to ${outputPath}\n`)
