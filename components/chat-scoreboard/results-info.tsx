interface ResultsInfoProps {
  filteredCount: number
  totalCount: number
  searchQuery: string
  currentPage: number
  totalPages: number
}

export function ResultsInfo({ filteredCount, totalCount, searchQuery, currentPage, totalPages }: ResultsInfoProps) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
      <div>
        {searchQuery ? (
          <span>
            Showing {filteredCount} of {totalCount} chats
            {filteredCount !== totalCount && <span className="ml-2">for "{searchQuery}"</span>}
          </span>
        ) : (
          <span>Total: {totalCount} chats</span>
        )}
      </div>
      {totalPages > 1 && (
        <div className="text-xs">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  )
}
