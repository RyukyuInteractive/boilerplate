import { LoaderIcon } from "lucide-react"

export function LoadingPage() {
  return (
    <div className={"flex h-svh w-full items-center justify-center"}>
      <LoaderIcon className={"h-8 w-8 animate-spin"} />
    </div>
  )
}
