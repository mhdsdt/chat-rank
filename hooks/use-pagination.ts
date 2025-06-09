"use client"

import { useState, useCallback } from "react"

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  resetPage: () => void
  paginatedItems: <T>(items: T[]) => T[]
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages],
  )

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  const paginatedItems = useCallback(
    (items: any[]): any[] => {
      return items.slice(startIndex, endIndex)
    },
    [startIndex, endIndex],
  )

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    resetPage,
    paginatedItems,
  }
}
