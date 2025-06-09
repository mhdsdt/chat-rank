"use client"

import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TrendingUp, MessageSquare } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useChartData } from "@/hooks/use-chart-data"
import type { MessageActivityAnalytics } from "@/types"

interface MessageActivityChartProps {
  data: MessageActivityAnalytics
}

type TimeRange = "daily" | "weekly" | "monthly"

const chartConfig = {
  messageCount: {
    label: "Messages",
    color: "hsl(var(--primary))",
  },
}

export function MessageActivityChart({ data }: MessageActivityChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly")

  const { processedData, totalMessages, formatXAxisLabel, formatTooltipLabel, timeRangeDescription } = useChartData({
    data,
    timeRange,
  })

  return (
    <div className="space-y-4 mt-4">
      <ChartHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        totalMessages={totalMessages}
        timeRangeDescription={timeRangeDescription}
      />

      <ChartCard
        processedData={processedData}
        formatXAxisLabel={formatXAxisLabel}
        formatTooltipLabel={formatTooltipLabel}
      />
    </div>
  )
}

interface ChartHeaderProps {
  timeRange: TimeRange
  setTimeRange: (value: TimeRange) => void
  totalMessages: number
  timeRangeDescription: Record<TimeRange, string>
}

function ChartHeader({ timeRange, setTimeRange, totalMessages, timeRangeDescription }: ChartHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          Message Activity Over Time
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {timeRangeDescription[timeRange]} • Total messages: {new Intl.NumberFormat().format(totalMessages)}
        </p>
      </div>

      <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value as TimeRange)}>
        <ToggleGroupItem value="daily" aria-label="Daily view">
          Daily
        </ToggleGroupItem>
        <ToggleGroupItem value="weekly" aria-label="Weekly view">
          Weekly
        </ToggleGroupItem>
        <ToggleGroupItem value="monthly" aria-label="Monthly view">
          Monthly
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

interface ChartCardProps {
  processedData: any[]
  formatXAxisLabel: (dateStr: string) => string
  formatTooltipLabel: (dateStr: string) => string
}

function ChartCard({ processedData, formatXAxisLabel, formatTooltipLabel }: ChartCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
      <CardContent className="p-6">
        <ChartLegend />
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxisLabel}
                tick={{
                  fill: "hsl(var(--foreground))",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{
                  fill: "hsl(var(--foreground))",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => new Intl.NumberFormat("en", { notation: "compact" }).format(value)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    labelFormatter={(value) => formatTooltipLabel(value)}
                    formatter={(value, name) => [new Intl.NumberFormat().format(value as number), "Messages"]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="messageCount"
                stroke="var(--color-messageCount)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-messageCount)",
                  strokeWidth: 0,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  stroke: "var(--color-messageCount)",
                  strokeWidth: 2,
                  fill: "hsl(var(--background))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function ChartLegend() {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
        <MessageSquare className="h-4 w-4 text-purple-500" />
        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Message Count</span>
      </div>
    </div>
  )
}
