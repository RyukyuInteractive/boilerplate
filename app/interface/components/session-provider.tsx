import { useSuspenseQuery } from "@tanstack/react-query"
import { SessionContext } from "~/interface/contexts/session-context"
import { honoClient } from "~/lib/hono-client"

const endpoint = honoClient.auth.session

type Props = {
  children: React.ReactNode
}

export function SessionProvider(props: Props) {
  const query = useSuspenseQuery({
    queryKey: [endpoint.$url()],
    async queryFn() {
      const resp = await honoClient.auth.session.$get()
      return resp.json()
    },
  })

  const refresh = async () => {
    query.refetch()
  }

  return (
    <SessionContext.Provider value={[query.data, refresh]}>
      {props.children}
    </SessionContext.Provider>
  )
}
