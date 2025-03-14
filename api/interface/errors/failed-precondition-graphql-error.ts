import { GraphQLError } from "graphql"

/**
 * FAILED_PRECONDITION
 * The operation was rejected because the system is not in a state required for the operation's execution.
 */
export class FailedPreconditionGraphQLError extends GraphQLError {
  constructor(
    message = "The operation was rejected because the system is not in a state required for the operation's execution.",
  ) {
    super(message, {
      extensions: {
        code: "FAILED_PRECONDITION",
        number: 9,
      },
    })
  }
}
