import { useSuspenseQuery } from "@apollo/client"
import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { ArrowLeftIcon } from "lucide-react"
import { LoginPage } from "~/interface/components/pages/login-page"
import { Separator } from "~/interface/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "~/interface/components/ui/sidebar"
import { useSession } from "~/interface/hooks/use-session"

export const Route = createFileRoute("/orgs/$organization")({
  component: RouteComponent,
})

function RouteComponent() {
  const [session] = useSession()

  const params = Route.useParams()

  const { data } = useSuspenseQuery(Query, {
    variables: { id: params.organization },
  })

  if (session === null) {
    return <LoginPage />
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link to={"/"}>
            <div className="flex items-center gap-2 p-2">
              <ArrowLeftIcon />
              <p className="font-bold">{"-"}</p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent />
        <Separator />
        <SidebarFooter />
      </Sidebar>
      <main className="min-h-screen flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

const Query = graphql(`
  query Query($id: ID!) {
    organization(id: $id) {
      id
      name
      projects(limit: 128, offset: 0) {
        id
        name
      }
    }
  }
`)
