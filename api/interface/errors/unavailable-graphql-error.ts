import { GraphQLError } from "graphql"

/**
 * UNAVAILABLE
 */
export class UnavailableGraphQLError extends GraphQLError {
  constructor(message = "The service is currently unavailable.") {
    super(message, {
      extensions: {
        code: "UNAVAILABLE",
        number: 14,
      },
    })
  }
}
