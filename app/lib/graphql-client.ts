import { GraphQLClient } from "graphql-request"

export const graphqlClient = new GraphQLClient(
  `${process.env.VITE_API_BASE_URL}/graphql/`,
  { credentials: "include" },
)
