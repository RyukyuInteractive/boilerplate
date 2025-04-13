import { Link } from "@tanstack/react-router"
import { type FragmentOf, graphql, readFragment } from "gql.tada"
import { Card } from "~/interface/components/ui/card"

type Props = {
  project: FragmentOf<typeof ProjectCardFragment>
}

/**
 * プロジェクト
 */
export function ProjectCard(props: Props) {
  const node = readFragment(ProjectCardFragment, props.project)

  return (
    <Link to="/$project" params={{ project: node.id }}>
      <Card className="p-4">
        <h2>{node.name}</h2>
      </Card>
    </Link>
  )
}

export const ProjectCardFragment = graphql(
  `fragment ProjectCardFragment on ProjectNode {
    id
    name
  }`,
)
