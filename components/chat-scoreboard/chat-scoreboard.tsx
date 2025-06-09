"use client"
import { MessageSquareText, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageActivityChart } from "@/components/message-activity-chart"
import { SearchBar } from "@/components/chat-scoreboard/search-bar"
import { ResultsInfo } from "@/components/chat-scoreboard/results-info"
import { ChatTable } from "@/components/chat-scoreboard/chat-table"
import { Pagination } from "@/components/chat-scoreboard/pagination"
import { useSearch } from "@/hooks/use-search"
import { usePagination } from "@/hooks/use-pagination"
import type { AnalyticsResult } from "@/types"

interface ChatScoreboardProps {
  data: AnalyticsResult | null
  isProcessing: boolean
}

const ITEMS_PER_PAGE = 20

export function ChatScoreboard({ data, isProcessing }: ChatScoreboardProps) {
  const chatData = data?.chats || []

  const { searchQuery, setSearchQuery, filteredItems, clearSearch } = useSearch({
    items: chatData,
    searchFields: ["name", "fullName", "id"],
  })

  const { currentPage, totalPages, startIndex, endIndex, goToPage, paginatedItems } = usePagination({
    totalItems: filteredItems.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const paginatedData = paginatedItems(filteredItems)

  if (isProcessing) {
    return <LoadingState />
  }

  if (!data || chatData.length === 0) {
    return <EmptyState />
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
        <div className="flex items-center space-x-2 mb-2">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} clearSearch={clearSearch} />
        </div>

        <ResultsInfo
          filteredCount={filteredItems.length}
          totalCount={chatData.length}
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <div className="flex-1 overflow-hidden border border-slate-200 dark:border-slate-700 rounded-md mb-3">
          <div className="h-full overflow-auto">
            <ChatTable
              paginatedData={paginatedData}
              originalData={chatData}
              searchQuery={searchQuery}
              clearSearch={clearSearch}
            />
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredItems.length}
        />
      </TabsContent>

      <TabsContent value="activity" className="flex-1 overflow-auto mt-2">
        {data?.messageActivity && <MessageActivityChart data={data.messageActivity} />}
      </TabsContent>
    </Tabs>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
      <p className="text-slate-600 dark:text-slate-300">Processing chat data...</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
      <MessageSquareText className="h-12 w-12 mb-4 opacity-50" />
      <p>Upload a Telegram chat export to see your analytics</p>
    </div>
  )
}
