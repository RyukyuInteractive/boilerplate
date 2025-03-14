import { GraphQLError } from "graphql"

/**
 * PERMISSION_DENIED
 */
export class PermissionDeniedGraphQLError extends GraphQLError {
  constructor(
    message = "The caller does not have permission to execute the specified operation.",
  ) {
    super(message, {
      extensions: {
        code: "PERMISSION_DENIED",
        number: 7,
      },
    })
  }
}
