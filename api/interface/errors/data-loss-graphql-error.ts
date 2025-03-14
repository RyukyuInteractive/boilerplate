import { GraphQLError } from "graphql"

/**
 * DATA_LOSS
 * Unrecoverable data loss or corruption.
 */
export class DataLossGraphQLError extends GraphQLError {
  constructor(message = "Unrecoverable data loss or corruption.") {
    super(message, {
      extensions: {
        code: "DATA_LOSS",
        number: 15,
      },
    })
  }
}
