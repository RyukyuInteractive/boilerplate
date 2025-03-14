import { exists } from "node:fs/promises"
import { join } from "node:path"
import { $ } from "bun"

const migrationId = crypto.randomUUID()

const migrationsDir = join(import.meta.dir, "..", "migrations")

const isNotFirstMigration = await exists(migrationsDir)

const from = isNotFirstMigration ? "local-d1" : "empty"

await $`npx prisma migrate diff --from-${from} --to-schema-datamodel ../schema.prisma --script --output migrations/${migrationId}.sql`
