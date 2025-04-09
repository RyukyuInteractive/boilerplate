import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import { Card } from "~/interface/components/ui/card"
import { cn } from "~/lib/utils"

interface PrimaryMetricType {
  id: string;
  name: string;
  description: string;
  monthlyChangeRatio: number;
  monthlyChangeValue: string;
  value: string;
  valueUnit: string;
}

type Props = {
  primaryMetric: PrimaryMetricType
}

/**
 * KPI
 */
export function PrimaryMetricCard(props: Props) {
  const metric = props.primaryMetric

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

export const PrimaryMetricCardFragment = {
  id: '',
  name: '',
  description: '',
  monthlyChangeRatio: 0,
  monthlyChangeValue: '',
  value: '',
  valueUnit: ''
}
