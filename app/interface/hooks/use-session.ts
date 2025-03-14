import { useContext } from "react"
import { SessionContext } from "~/interface/contexts/session-context"

export function useSession() {
  return useContext(SessionContext)
}
