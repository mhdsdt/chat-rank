"use client"

import { MessageSquareText, HelpCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportGuide } from "@/components/export-guide"
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
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700">
          <TabsTrigger value="guide" className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>How to Export</span>
          </TabsTrigger>
          <TabsTrigger value="scoreboard" className="flex items-center space-x-2">
            <MessageSquareText className="h-4 w-4" />
            <span>Scoreboard</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="guide" className="mt-6">
          <ExportGuide />
        </TabsContent>
        <TabsContent value="scoreboard" className="mt-6">
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <MessageSquareText className="h-12 w-12 mb-4 opacity-50" />
            <p>Upload a Telegram chat export to see your scoreboard</p>
          </div>
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <Tabs defaultValue="scoreboard" className="w-full">
      <TabsList className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700">
        <TabsTrigger value="scoreboard" className="flex items-center space-x-2">
          <MessageSquareText className="h-4 w-4" />
          <span>Scoreboard</span>
        </TabsTrigger>
        <TabsTrigger value="guide" className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4" />
          <span>How to Export</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="scoreboard" className="mt-6">
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
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {index === 0 && <span className="text-yellow-500">🥇</span>}
                      {index === 1 && <span className="text-gray-400">🥈</span>}
                      {index === 2 && <span className="text-amber-600">🥉</span>}
                      <span>{index + 1}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium mixed-content">{chat.name}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {new Intl.NumberFormat().format(chat.messageCount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="guide" className="mt-6">
        <ExportGuide />
      </TabsContent>
    </Tabs>
  )
}
