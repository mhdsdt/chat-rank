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

// Helper function to detect if text contains Persian/Arabic characters
const containsPersianArabic = (text: string): boolean => {
  const persianArabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
  return persianArabicRegex.test(text)
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
                <TableHead className="w-20">Rank</TableHead>
                <TableHead>Contact / Chat Name</TableHead>
                <TableHead className="w-24 text-center">ID</TableHead>
                <TableHead className="text-right">Messages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((chat, index) => {
                const isPersianArabic = containsPersianArabic(chat.fullName)
                const displayName = chat.fullName || chat.name
                const showId = chat.id !== "unknown"

                return (
                  <TableRow key={`${chat.name}_${chat.id}`}>
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-right min-w-[2ch]">{index + 1}</span>
                        <div className="flex items-center">
                          {index === 0 && <span className="text-yellow-500 ml-1">🥇</span>}
                          {index === 1 && <span className="text-gray-400 ml-1">🥈</span>}
                          {index === 2 && <span className="text-amber-600 ml-1">🥉</span>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <span className={isPersianArabic ? "font-vazirmatn" : "mixed-content"}>{displayName}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {showId && (
                        <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          #{chat.id}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {new Intl.NumberFormat().format(chat.messageCount)}
                    </TableCell>
                  </TableRow>
                )
              })}
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
