import { GraphQLError } from "graphql"

/**
 * DEADLINE_EXCEEDED
 */
export class DeadlineExceededGraphQLError extends GraphQLError {
  constructor(
    message = "The deadline expired before the operation could complete.",
  ) {
    super(message, {
      extensions: {
        code: "DEADLINE_EXCEEDED",
        number: 4,
      },
    })
  }
}
