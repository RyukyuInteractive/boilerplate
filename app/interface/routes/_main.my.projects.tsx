import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { useQuery } from "urql"
import {
  ProjectCard,
  ProjectCardFragment,
} from "~/interface/components/card/project-card"

export const Route = createFileRoute("/_main/my/projects")({
  component: RouteComponent,
})

function RouteComponent() {
  const [result] = useQuery({ query: Query })

  const projects = result.data?.viewer?.projectMembers.flatMap((node) => {
    return node.project
  })

  if (result.fetching) {
    return null
  }

  if (projects === undefined) {
    return null
  }

  return (
    <div className="space-y-4 p-4">
      {projects?.map((node) => (
        <ProjectCard key={node.id} project={node} />
      ))}
    </div>
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
          ...ProjectCardFragment
        }
      }
    }
  }`,
  [ProjectCardFragment],
)
