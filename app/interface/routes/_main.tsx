import { useSuspenseQuery } from "@apollo/client"
import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import {
  KeyIcon,
  Layers2Icon,
  ListIcon,
  PlusIcon,
  SettingsIcon,
  SquareUserIcon,
} from "lucide-react"
import { DarkModeButton } from "~/interface/components/dark-mode-button"
import { LoginPage } from "~/interface/components/pages/login-page"
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

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
})

function RouteComponent() {
  const [session] = useSession()

  const { data } = useSuspenseQuery(Query)

  if (session === null) {
    return <LoginPage />
  }

  const sectionItems = [
    {
      title: "プロフィール",
      url: "/my/profile",
      icon: SquareUserIcon,
    },
    {
      title: "アカウント",
      url: "/my/account",
      icon: KeyIcon,
    },
    {
      title: "設定",
      url: "/my/settings",
      icon: SettingsIcon,
    },
  ]

  const viewer = data.viewer

  const projects = viewer?.projectMembers.flatMap((t) => {
    return t.project
  })

  const organizations = viewer?.organizationMembers.flatMap((t) => {
    return t.organization
  })

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <p className="font-bold">{"-"}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{"プロジェクト"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"/my/projects"}>
                      <ListIcon />
                      <span>{"一覧"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {projects?.map((node) => (
                  <SidebarMenuItem key={node.id}>
                    <SidebarMenuButton asChild>
                      <Link to={"/$project"} params={{ project: node.id }}>
                        <Layers2Icon />
                        <span>{node.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"/projects/new"}>
                      <PlusIcon />
                      <span>{"新しいプロジェクト"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{"組織"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"/my/organizations"}>
                      <ListIcon />
                      <span>{"一覧"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {organizations?.map((node) => (
                  <SidebarMenuItem key={node.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={"/orgs/$organization"}
                        params={{ organization: node.id }}
                      >
                        <Layers2Icon />
                        <span>{node.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"/orgs/new"}>
                      <PlusIcon />
                      <span>{"新しい組織"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>{"設定"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sectionItems.map((item) => (
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
        <SidebarFooter>
          <div className="p-2">
            <DarkModeButton />
            <p>{"© 2021 -"}</p>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="min-h-screen flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

const Query = graphql(`
  query Query {
    viewer {
      id
      projectMembers(limit: 16,offset: 0) {
        id
        project {
          id
          name
        }
      }
      organizationMembers(limit: 16, offset: 0) {
        id
        organization {
          id
          name
        }
      }
    }
  }
`)
