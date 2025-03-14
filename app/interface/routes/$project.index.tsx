import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { useQuery } from "urql"

export const Route = createFileRoute("/$project/")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  const [result] = useQuery({
    query: Query,
    variables: { projectId: params.project },
  })

  return (
    <div className="flex w-full flex-1 overflow-x-hidden">
      {result.data?.project?.name}
    </div>
  )
}

const Query = graphql(
  `query Query($projectId: ID!) {
    project(id: $projectId) {
      id
      name
    }
  }`,
)
