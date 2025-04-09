import { useCallback } from "react"

interface QueryOptions<TVariables> {
  variables?: TVariables;
  onCompleted?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface QueryResult<TData> {
  data: TData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useQuery = <TData = any, TVariables = any>(
  query: any, 
  options?: QueryOptions<TVariables>
): QueryResult<TData> => {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => Promise.resolve(),
  }
}

interface MutationOptions {
  onCompleted?: (data: any) => void;
  onError?: (error: Error) => void;
}

type MutationFn<TData = any, TVariables = any> = (
  options: { variables: TVariables }
) => Promise<TData>;

export const useMutation = <TData = any, TVariables = any>(
  mutation: any, 
  options?: MutationOptions
): [MutationFn<TData, TVariables>] => {
  const mutate = useCallback(
    (params: { variables: TVariables }) => {
      if (options?.onCompleted) {
        options.onCompleted({})
      }
      return Promise.resolve({} as TData)
    },
    [options]
  )

  return [mutate]
}
