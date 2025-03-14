import { GraphQLError } from "graphql"

/**
 * ALREADY_EXISTS
 * The entity that a client attempted to create (e.g., file or directory) already exists.
 */
export class AlreadyExistsGraphQLError extends GraphQLError {
  constructor(
    message = "The entity that a client attempted to create already exists.",
  ) {
    super(message, {
      extensions: {
        code: "ALREADY_EXISTS",
        number: 6,
      },
    })
  }
}
