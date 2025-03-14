import { GraphQLError } from "graphql"

/**
 * INTERNAL
 * https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
 */
export class InternalGraphQLError extends GraphQLError {
  constructor(message = "システム内部でエラーが発生しました。") {
    super(message, {
      extensions: {
        code: "INTERNAL",
        number: 13,
      },
    })
  }
}
