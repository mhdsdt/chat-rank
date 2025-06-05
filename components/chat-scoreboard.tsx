"use client"

import { MessageSquareText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { SortedChatResult } from "@/types"

interface ChatScoreboardProps {
  data: SortedChatResult[] | null
  isProcessing: boolean
}

export function ChatScoreboard({ data, isProcessing }: ChatScoreboardProps) {
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-slate-600 dark:text-slate-300">Processing chat data...</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
        <MessageSquareText className="h-12 w-12 mb-4 opacity-50" />
        <p>Upload a Telegram chat export to see your scoreboard</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rank</TableHead>
            <TableHead>Contact / Chat Name</TableHead>
            <TableHead className="text-right">Messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((chat, index) => (
            <TableRow key={chat.name}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{chat.name}</TableCell>
              <TableCell className="text-right">{new Intl.NumberFormat().format(chat.messageCount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
