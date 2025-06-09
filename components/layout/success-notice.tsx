"use client"

import { Button } from "@/components/ui/button"
import type { AnalyticsResult } from "@/types"

interface SuccessNoticeProps {
  data: AnalyticsResult
  onViewAnalytics: () => void
}

export function SuccessNotice({ data, onViewAnalytics }: SuccessNoticeProps) {
  return (
    <div className="mt-4 p-3 bg-green-50/80 dark:bg-green-900/30 rounded-md border border-green-100/50 dark:border-green-800/50">
      <div className="flex items-center justify-between">
        <p className="text-sm text-green-700 dark:text-green-300">Successfully analyzed {data.chats.length} chats.</p>
        <Button onClick={onViewAnalytics} size="sm">
          View Analytics
        </Button>
      </div>
    </div>
  )
}
