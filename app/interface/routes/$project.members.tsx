import { useSuspenseQuery } from "@apollo/client"
import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"

export const Route = createFileRoute("/$project/members")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  const { data } = useSuspenseQuery(Query, {
    variables: { projectId: params.project },
  })

  return (
    <div className="flex w-full flex-1 overflow-x-hidden">
      {data.project?.name}
    </div>
  )
}

const Query = graphql(`
  query Query($projectId: ID!) {
    project(id: $projectId) {
      id
      name
    }
  }
`)
