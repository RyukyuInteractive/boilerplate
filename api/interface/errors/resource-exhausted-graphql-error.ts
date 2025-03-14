import { GraphQLError } from "graphql"

/**
 * RESOURCE_EXHAUSTED
 */
export class ResourceExhaustedGraphQLError extends GraphQLError {
  constructor(
    message = "Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.",
  ) {
    super(message, {
      extensions: {
        code: "RESOURCE_EXHAUSTED",
        number: 8,
      },
    })
  }
}
