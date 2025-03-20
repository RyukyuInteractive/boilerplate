import { type InferInput, parse } from "valibot"
import { config } from "./config"
import { readCsvPages } from "./utils/read-csv-pages"
import { toCsvFromRecord } from "./utils/to-csv-from-record"
import { toPageNameFromPath } from "./utils/to-page-name-from-path"
import { toPathFromFilename } from "./utils/to-path-from-filename"
import { writeTextFile } from "./utils/write-text-file"
import { vPage } from "./validations/page"

type Page = InferInput<typeof vPage>

export async function updatePagesCsv() {
  const currentMap = await readCsvPages()

  const draftMap = new Map(currentMap)

  const glob = new Bun.Glob("*.tsx")

  const fileNames: string[] = []

  const fileDirectory = `${process.cwd()}/${config.project.appRoutes}`

  for await (const filePath of glob.scan(fileDirectory)) {
    fileNames.push(filePath)
  }

  const routeFiles = fileNames.filter((fileName) => {
    const lastSegment = fileName.replace(".tsx", "").split(".").pop()
    if (lastSegment?.startsWith("_")) return false
    if (lastSegment?.startsWith("__")) return false
    return true
  })

  for (const filePath of routeFiles) {
    const routePath = toPathFromFilename(filePath)

    const file = `${config.project.appRoutes}/${filePath}`

    const existingPage = currentMap.get(routePath)

    if (existingPage !== undefined) {
      draftMap.set(routePath, existingPage)
      continue
    }

    const draft = parse(vPage, {
      path: routePath,
      name: toPageNameFromPath(routePath),
      description: "",
      is_deprecated: false,
      deprecated_reason: "",
      file: file,
    } satisfies Page)

    draftMap.set(routePath, draft)
  }

  for (const [path, page] of currentMap.entries()) {
    if (draftMap.has(path)) continue

    const draft = parse(vPage, { ...page, is_deprecated: true })

    draftMap.set(path, draft)
  }

  const records = Array.from(draftMap.values()).filter((page) => {
    return !page.is_deprecated
  })

  const sortedRecords = records.toSorted((a, b) => {
    return a.path.localeCompare(b.path)
  })

  const csvContent = toCsvFromRecord(sortedRecords, [
    "path",
    "name",
    "description",
    "is_deprecated",
    "deprecated_reason",
    "file",
  ])

  await writeTextFile(csvContent, config.path.pages)
}
