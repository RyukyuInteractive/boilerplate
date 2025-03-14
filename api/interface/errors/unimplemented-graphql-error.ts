import { GraphQLError } from "graphql"

/**
 * UNIMPLEMENTED
 * The operation is not implemented or is not supported/enabled in this service.
 */
export class UnimplementedGraphQLError extends GraphQLError {
  constructor(
    message = "The operation is not implemented or is not supported/enabled in this service.",
  ) {
    super(message, {
      extensions: {
        code: "UNIMPLEMENTED",
        number: 12,
      },
    })
  }
}
