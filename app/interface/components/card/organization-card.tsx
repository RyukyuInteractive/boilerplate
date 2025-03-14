import { Link } from "@tanstack/react-router"
import { type FragmentOf, graphql, readFragment } from "gql.tada"
import { Card } from "~/interface/components/ui/card"

type Props = {
  organization: FragmentOf<typeof OrganizationCardFragment>
}

/**
 * 組織
 */
export function OrganizationCard(props: Props) {
  const node = readFragment(OrganizationCardFragment, props.organization)

  return (
    <Link to="/orgs/$organization" params={{ organization: node.id }}>
      <Card className="p-4">
        <h2>{node.name}</h2>
      </Card>
    </Link>
  )
}

export const OrganizationCardFragment = graphql(
  `fragment OrganizationCardFragment on OrganizationNode {
    id
    name
  }
`,
)
