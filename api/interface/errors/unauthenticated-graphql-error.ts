import { GraphQLError } from "graphql"

/**
 * UNAUTHENTICATED
 */
export class UnauthenticatedGraphQLError extends GraphQLError {
  constructor(
    message = "The request does not have valid authentication credentials for the operation.",
  ) {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        number: 16,
      },
    })
  }
}
