"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  startIndex: number
  endIndex: number
  totalItems: number
}

export function Pagination({ currentPage, totalPages, goToPage, startIndex, endIndex, totalItems }: PaginationProps) {
  return (
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

        <PageNumbers currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />

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
  )
}

interface PageNumbersProps {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
}

function PageNumbers({ currentPage, totalPages, goToPage }: PageNumbersProps) {
  const pageNumbers = calculatePageNumbers(currentPage, totalPages)

  return (
    <div className="flex items-center space-x-1">
      {pageNumbers.map((pageNum) => (
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
      ))}
    </div>
  )
}

function calculatePageNumbers(currentPage: number, totalPages: number): number[] {
  const maxVisiblePages = 5

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return Array.from({ length: maxVisiblePages }, (_, i) => i + 1)
  }

  if (currentPage >= totalPages - 2) {
    return Array.from({ length: maxVisiblePages }, (_, i) => totalPages - maxVisiblePages + i + 1)
  }

  return Array.from({ length: maxVisiblePages }, (_, i) => currentPage - 2 + i)
}
