"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { containsPersianArabic } from "@/lib/text-utils"
import type { SortedChatResult } from "@/types"

interface ChatTableProps {
  paginatedData: SortedChatResult[]
  originalData: SortedChatResult[]
  searchQuery: string
  clearSearch: () => void
}

export function ChatTable({ paginatedData, originalData, searchQuery, clearSearch }: ChatTableProps) {
  return (
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
          paginatedData.map((chat) => (
            <ChatTableRow key={`${chat.name}_${chat.id}`} chat={chat} originalData={originalData} />
          ))
        ) : (
          <EmptyTableRow searchQuery={searchQuery} clearSearch={clearSearch} />
        )}
      </TableBody>
    </Table>
  )
}

interface ChatTableRowProps {
  chat: SortedChatResult
  originalData: SortedChatResult[]
}

function ChatTableRow({ chat, originalData }: ChatTableRowProps) {
  const isPersianArabic = containsPersianArabic(chat.fullName)
  const displayName = chat.fullName || chat.name
  const showId = chat.id !== "unknown"

  const originalRank =
    originalData.findIndex((originalChat) => originalChat.name === chat.name && originalChat.id === chat.id) + 1

  return (
    <TableRow>
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
      <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(chat.messageCount)}</TableCell>
    </TableRow>
  )
}

interface EmptyTableRowProps {
  searchQuery: string
  clearSearch: () => void
}

function EmptyTableRow({ searchQuery, clearSearch }: EmptyTableRowProps) {
  return (
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
  )
}
