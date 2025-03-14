import { createFileRoute } from "@tanstack/react-router"
import { graphql } from "gql.tada"
import { useQuery } from "urql"
import {
  OrganizationCard,
  OrganizationCardFragment,
} from "~/interface/components/card/organization-card"

export const Route = createFileRoute("/_main/my/organizations")({
  component: RouteComponent,
})

function RouteComponent() {
  const [result] = useQuery({ query: Query })

  const organizations = result.data?.viewer?.organizationMembers.flatMap(
    (node) => {
      return node.organization
    },
  )

  if (result.fetching) {
    return null
  }

  if (organizations === undefined) {
    return null
  }

  return (
    <div className="space-y-4 p-4">
      {organizations?.map((node) => (
        <OrganizationCard key={node.id} organization={node} />
      ))}
    </div>
  )
}

const Query = graphql(
  `query Query {
    viewer {
      id
      organizationMembers(limit: 16, offset: 0) {
        id
        organization {
          id
          ...OrganizationCardFragment
        }
      }
    }
  }`,
  [OrganizationCardFragment],
)
