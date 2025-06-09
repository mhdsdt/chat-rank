"use client"

import { useState } from "react"
import { MessageSquareText, Search, X, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageActivityChart } from "@/components/message-activity-chart"
import type { AnalyticsResult } from "@/types"

interface ChatScoreboardProps {
  data: AnalyticsResult | null
  isProcessing: boolean
}

const ITEMS_PER_PAGE = 20

// Helper function to detect if text contains Persian/Arabic characters
const containsPersianArabic = (text: string): boolean => {
  const persianArabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
  return persianArabicRegex.test(text)
}

export function ChatScoreboard({ data, isProcessing }: ChatScoreboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const chatData = data?.chats || []

  // Filter data based on search query
  const filteredData = chatData.filter((chat) => {
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase().trim()
    const name = (chat.fullName || chat.name).toLowerCase()
    const id = chat.id.toLowerCase()

    return name.includes(query) || id.includes(query)
  })

  // Calculate pagination
  const totalItems = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-slate-600 dark:text-slate-300">Processing chat data...</p>
      </div>
    )
  }

  if (!data || chatData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
        <MessageSquareText className="h-12 w-12 mb-4 opacity-50" />
        <p>Upload a Telegram chat export to see your analytics</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="scoreboard" className="w-full h-full flex flex-col">
      <TabsList className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 justify-start w-fit">
        <TabsTrigger value="scoreboard" className="flex items-center space-x-2">
          <MessageSquareText className="h-4 w-4" />
          <span>Chat Rankings</span>
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>Message Activity</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="scoreboard" className="flex-1 flex flex-col overflow-hidden data-[state=inactive]:hidden">
        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400 z-10" />
            <Input
              type="text"
              placeholder="Search by contact name or ID..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 z-10"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
          <div>
            {searchQuery && filteredData ? (
              <span>
                Showing {filteredData.length} of {chatData.length} chats
                {filteredData.length !== chatData.length && <span className="ml-2">for "{searchQuery}"</span>}
              </span>
            ) : (
              <span>Total: {chatData.length} chats</span>
            )}
          </div>
          {totalPages > 1 && (
            <div className="text-xs">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Table with fixed height and scrolling */}
        <div className="flex-1 overflow-hidden border border-slate-200 dark:border-slate-700 rounded-md mb-3">
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white/95 dark:bg-slate-900/95 z-20 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
                <TableRow>
                  <TableHead className="w-20 bg-white/95 dark:bg-slate-900/95">Rank</TableHead>
                  <TableHead className="bg-white/95 dark:bg-slate-900/95">Contact / Chat Name</TableHead>
                  <TableHead className="w-24 text-center bg-white/95 dark:bg-slate-900/95">ID</TableHead>
                  <TableHead className="text-right bg-white/95 dark:bg-slate-900/95">Messages</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((chat, index) => {
                    const isPersianArabic = containsPersianArabic(chat.fullName)
                    const displayName = chat.fullName || chat.name
                    const showId = chat.id !== "unknown"

                    // Find original rank in unfiltered data
                    const originalRank =
                      chatData.findIndex(
                        (originalChat) => originalChat.name === chat.name && originalChat.id === chat.id,
                      ) + 1

                    return (
                      <TableRow key={`${chat.name}_${chat.id}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-right min-w-[2ch]">{originalRank}</span>
                            <div className="flex items-center">
                              {originalRank === 1 && <span className="text-yellow-500 ml-1">🥇</span>}
                              {originalRank === 2 && <span className="text-gray-400 ml-1">🥈</span>}
                              {originalRank === 3 && <span className="text-amber-600 ml-1">🥉</span>}
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
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500 dark:text-slate-400">
                      {searchQuery ? (
                        <div className="space-y-2">
                          <p>No chats found matching "{searchQuery}"</p>
                          <Button variant="outline" size="sm" onClick={clearSearch}>
                            Clear search
                          </Button>
                        </div>
                      ) : (
                        "No chat data available"
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination - Always visible */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {/* Show page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity" className="flex-1 overflow-auto mt-2">
        {data?.messageActivity && <MessageActivityChart data={data.messageActivity} />}
      </TabsContent>
    </Tabs>
  )
}
