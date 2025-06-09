"use client"

import { useState, useCallback, useMemo } from "react"

interface UseSearchProps<T> {
  items: T[]
  searchFields: (keyof T)[]
  initialQuery?: string
}

interface UseSearchReturn<T> {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredItems: T[]
  clearSearch: () => void
}

export function useSearch<T>({ items, searchFields, initialQuery = "" }: UseSearchProps<T>): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase().trim()

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field]
        if (typeof value === "string") {
          return value.toLowerCase().includes(query)
        }
        return false
      })
    })
  }, [items, searchFields, searchQuery])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch,
  }
}
