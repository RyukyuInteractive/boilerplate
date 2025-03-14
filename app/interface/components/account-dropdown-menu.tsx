import { useMutation } from "@tanstack/react-query"
import { ChevronDownIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/interface/components/ui/avatar"
import { Button } from "~/interface/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/interface/components/ui/dropdown-menu"
import { honoClient } from "~/lib/hono-client"

/**
 * アカウント
 */
export function AccountDropdownMenu() {
  const mutation = useMutation({
    async mutationFn() {
      await honoClient.auth.sign.in
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-auto w-full justify-between"
          variant={"ghost"}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <div>{"Inta"}</div>
          </div>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem>{""}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
