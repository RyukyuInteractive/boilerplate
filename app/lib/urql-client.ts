import { Client, cacheExchange, fetchExchange } from "urql"

export const urqlClient = new Client({
  url: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    /**
     * クッキーを送信する
     */
    credentials: "include",
  },
})
