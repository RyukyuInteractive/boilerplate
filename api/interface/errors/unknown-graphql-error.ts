import { GraphQLError } from "graphql"

/**
 * UNKNOWN
 */
export class UnknownGraphQLError extends GraphQLError {
  constructor(message = "UNKONOW") {
    super(message, {
      extensions: {
        code: "UNKNOWN",
        number: 2,
      },
    })
  }
}
