"use client"

import { useState, useCallback } from "react"

type ViewState = "upload" | "analytics"

interface UseViewStateReturn {
  currentView: ViewState
  setView: (view: ViewState) => void
  handleBackToUpload: () => void
  handleViewAnalytics: () => void
}

export function useViewState(initialView: ViewState = "upload"): UseViewStateReturn {
  const [currentView, setCurrentView] = useState<ViewState>(initialView)

  const setView = useCallback((view: ViewState) => {
    setCurrentView(view)
  }, [])

  const handleBackToUpload = useCallback(() => {
    setCurrentView("upload")
  }, [])

  const handleViewAnalytics = useCallback(() => {
    setCurrentView("analytics")
  }, [])

  return {
    currentView,
    setView,
    handleBackToUpload,
    handleViewAnalytics,
  }
}
