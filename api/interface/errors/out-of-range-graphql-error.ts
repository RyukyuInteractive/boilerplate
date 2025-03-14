import { GraphQLError } from "graphql"

/**
 * OUT_OF_RANGE
 */
export class OutOfRangeGraphQLError extends GraphQLError {
  constructor(message = "The client specified an invalid argument.") {
    super(message, {
      extensions: {
        code: "OUT_OF_RANGE",
        number: 3,
      },
    })
  }
}
