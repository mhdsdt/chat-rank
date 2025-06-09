"use client"

import { useMemo } from "react"
import type { MessageActivityAnalytics, MessageActivityData } from "@/types"

type TimeRange = "daily" | "weekly" | "monthly"

interface UseChartDataProps {
  data: MessageActivityAnalytics
  timeRange: TimeRange
}

interface UseChartDataReturn {
  processedData: MessageActivityData[]
  totalMessages: number
  formatXAxisLabel: (dateStr: string) => string
  formatTooltipLabel: (dateStr: string) => string
  timeRangeDescription: Record<TimeRange, string>
}

export function useChartData({ data, timeRange }: UseChartDataProps): UseChartDataReturn {
  const processedData = useMemo(() => {
    const allData = data[timeRange]

    const sortedData = [...allData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (timeRange === "daily") {
      return sortedData.slice(-30)
    } else if (timeRange === "weekly") {
      return sortedData.slice(-26)
    } else {
      return sortedData
    }
  }, [data, timeRange])

  const totalMessages = useMemo(() => processedData.reduce((sum, item) => sum + item.messageCount, 0), [processedData])

  const formatXAxisLabel = useMemo(
    () => (dateStr: string) => {
      const date = new Date(dateStr)
      switch (timeRange) {
        case "daily":
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        case "weekly":
          return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        case "monthly":
          return date.toLocaleDateString("en-US", { year: "2-digit", month: "short" })
        default:
          return dateStr
      }
    },
    [timeRange],
  )

  const formatTooltipLabel = useMemo(
    () => (dateStr: string) => {
      const date = new Date(dateStr)
      switch (timeRange) {
        case "daily":
          return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        case "weekly":
          return `Week of ${date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        case "monthly":
          return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
        default:
          return dateStr
      }
    },
    [timeRange],
  )

  const timeRangeDescription = {
    daily: "Last 30 days",
    weekly: "Last 26 weeks",
    monthly: "All months",
  }

  return {
    processedData,
    totalMessages,
    formatXAxisLabel,
    formatTooltipLabel,
    timeRangeDescription,
  }
}
