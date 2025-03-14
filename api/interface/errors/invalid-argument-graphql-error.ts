import { GraphQLError } from "graphql"

/**
 * INVALID_ARGUMENT
 */
export class InvalidArgumentGraphQLError extends GraphQLError {
  constructor(message = "リクエスト内容に問題があります。") {
    super(message, {
      extensions: {
        code: "INVALID_ARGUMENT",
        number: 3,
      },
    })
  }
}
