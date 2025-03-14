import { GraphQLError } from "graphql"

/**
 * CANCELLED
 * The operation was cancelled, typically by the caller.
 */
export class CancelledGraphQLError extends GraphQLError {
  constructor(
    message = "The operation was cancelled, typically by the caller.",
  ) {
    super(message, {
      extensions: {
        code: "CANCELLED",
        number: 1,
      },
    })
  }
}
