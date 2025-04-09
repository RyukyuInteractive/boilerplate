import { useCallback } from "react"

export const useQuery = (query: any, options: any) => {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => Promise.resolve(),
  }
}

export const useMutation = (mutation: any, options: any) => {
  const mutate = useCallback(
    (params: any) => {
      if (options?.onCompleted) {
        options.onCompleted()
      }
      return Promise.resolve()
    },
    [options]
  )

  return [mutate]
}
