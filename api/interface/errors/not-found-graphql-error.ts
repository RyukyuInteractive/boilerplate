import { GraphQLError } from "graphql"

/**
 * NOT_FOUND
 * Some requested entity (e.g., file or directory) was not found.
 */
export class NotFoundGraphQLError extends GraphQLError {
  constructor(message = "Some requested entity was not found.") {
    super(message, {
      extensions: {
        code: "NOT_FOUND",
        number: 5,
      },
    })
  }
}
