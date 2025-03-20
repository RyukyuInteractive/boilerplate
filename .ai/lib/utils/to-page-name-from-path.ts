export function toPageNameFromPath(routePath: string): string {
  if (routePath === "index") return "ホーム"

  const lastSegment = routePath.split(".").filter(Boolean).pop() || ""

  const cleanSegment = lastSegment.replace(/$/, "")

  const segmentWithSpaces = cleanSegment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()

  const capitalizedSegment =
    segmentWithSpaces.charAt(0).toUpperCase() + segmentWithSpaces.slice(1)

  return capitalizedSegment
}
