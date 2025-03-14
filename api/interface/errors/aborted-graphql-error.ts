import { GraphQLError } from "graphql"

/**
 * ABORTED
 */
export class AbortedGraphQLError extends GraphQLError {
  constructor(
    message = "The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort.",
  ) {
    super(message, {
      extensions: {
        code: "ABORTED",
        number: 10,
      },
    })
  }
}
