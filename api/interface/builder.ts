import SchemaBuilder from "@pothos/core"
import type { YogaContext } from "env"

/**
 * https://pothos-graphql.dev/docs/guide/schema-builder#creating-a-schema-builder
 */
export const builder = new SchemaBuilder<{ Context: YogaContext }>({})
