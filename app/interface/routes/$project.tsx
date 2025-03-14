import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { HomeIcon, InboxIcon, UserIcon } from "lucide-react"
import { useQuery } from "urql"
import { AccountDropdownMenu } from "~/interface/components/account-dropdown-menu"
import { LoginPage } from "~/interface/components/pages/login-page"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/interface/components/ui/select"
import { Separator } from "~/interface/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/interface/components/ui/sidebar"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createFileRoute("/$project")({
  component: RouteComponent,
})

function RouteComponent() {
  const [session] = useSession()

  const params = Route.useParams()

  const [result] = useQuery({ query: Query })

  if (session === null) {
    return <LoginPage />
  }

  const projectSectionItems = [
    {
      title: "ホーム",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "プロジェクト",
      url: `/${params.project}`,
      icon: InboxIcon,
    },
  ]

  const settingSectionItems = [
    {
      title: "メンバー",
      url: `/${params.project}/members`,
      icon: UserIcon,
    },
    {
      title: "プロジェクト",
      url: `/${params.project}/profile`,
      icon: InboxIcon,
    },
    {
      title: "設定",
      url: `/${params.project}/settings`,
      icon: InboxIcon,
    },
  ]

  const myProjects = result.data?.viewer?.projectMembers.flatMap((node) => {
    return node.project
  })

  const currentProject = myProjects?.find((node) => node.id === params.project)

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Select value={currentProject?.id}>
            <SelectTrigger className="w-full border-none bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {myProjects?.map((node) => (
                <SelectItem key={node.id} value={node.id}>
                  {node.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{"-"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projectSectionItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{"設定"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingSectionItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Separator />
        <SidebarFooter>
          <AccountDropdownMenu />
        </SidebarFooter>
      </Sidebar>
      <main className="min-h-screen flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

const Query = graphql(
  `query Query {
    viewer {
      id
      projectMembers(limit: 16, offset: 0) {
        id
        project {
          id
          name
        }
      }
    }
  }`,
)
