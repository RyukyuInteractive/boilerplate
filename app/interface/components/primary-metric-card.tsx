import { type FragmentOf, graphql, readFragment } from "gql.tada"
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import { Card } from "~/interface/components/ui/card"
import { cn } from "~/lib/utils"

type Props = {
  primaryMetric: FragmentOf<typeof PrimaryMetricCardFragment>
}

/**
 * KPI
 */
export function PrimaryMetricCard(props: Props) {
  const metric = readFragment(PrimaryMetricCardFragment, props.primaryMetric)

  return (
    <Card className="space-y-2 p-4">
      <div>
        <p className="text-muted-foreground text-sm">{metric.name}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-2xl tracking-tight">
          {metric.value}
          {metric.valueUnit}
        </h3>
        <div className="flex items-center gap-x-1">
          {0 <= metric.monthlyChangeRatio && (
            <ArrowUpRightIcon className="h-4 w-4 text-green-700" />
          )}
          {metric.monthlyChangeRatio < 0 && (
            <ArrowDownRightIcon className="h-4 w-4 text-red-700" />
          )}
          <div
            className={cn("font-bold text-sm", {
              "text-green-700": 0 <= metric.monthlyChangeRatio,
              "text-red-700": metric.monthlyChangeRatio < 0,
            })}
          >
            {`${metric.monthlyChangeRatio}%`}
          </div>
          <div className="text-muted-foreground text-xs">{`（${metric.monthlyChangeValue}）`}</div>
        </div>
      </div>
    </Card>
  )
}

export const PrimaryMetricCardFragment = graphql(
  `fragment PrimaryMetricCardFragment on PrimaryMetricNode {
    id
    name
    description
    monthlyChangeRatio
    monthlyChangeValue
    value
    valueUnit
  }`,
)
