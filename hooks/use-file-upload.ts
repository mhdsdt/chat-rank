"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { parseTelegramExport } from "@/lib/parser"
import type { AnalyticsResult } from "@/types"

interface UseFileUploadProps {
  onProcessedData: (data: AnalyticsResult | null) => void
  onAnalysisComplete?: () => void
}

interface UseFileUploadReturn {
  selectedFile: File | null
  isProcessing: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  isDragging: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: () => void
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleReset: () => void
  handleAnalyze: () => void
  validateAndSetFile: (file: File) => void
  setIsProcessing: (isProcessing: boolean) => void
}

export function useFileUpload({ onProcessedData, onAnalysisComplete }: UseFileUploadProps): UseFileUploadReturn {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const validateAndSetFile = useCallback(
    (file: File) => {
      if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a JSON file.",
        })
        return
      }

      setSelectedFile(file)
      toast({
        title: "File selected",
        description: `${file.name} is ready for analysis.`,
      })
    },
    [toast],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      if (file) {
        validateAndSetFile(file)
      }
    },
    [validateAndSetFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file) {
        validateAndSetFile(file)
      }
    },
    [validateAndSetFile],
  )

  const handleReset = useCallback(() => {
    setSelectedFile(null)
    onProcessedData(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onProcessedData])

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) return

    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string)
        const processedData = parseTelegramExport(jsonData)

        onProcessedData(processedData)

        toast({
          title: "Analysis complete",
          description: `Successfully analyzed ${processedData.chats.length} chats.`,
        })

        // Auto-navigate to analytics after successful processing
        if (onAnalysisComplete) {
          onAnalysisComplete()
        }
      } catch (error) {
        console.error("Error processing file:", error)
        onProcessedData(null)

        toast({
          variant: "destructive",
          title: "Processing error",
          description: "Could not process the file. Please ensure it's a valid Telegram export.",
        })
      } finally {
        setIsProcessing(false)
      }
    }

    reader.onerror = () => {
      onProcessedData(null)
      setIsProcessing(false)

      toast({
        variant: "destructive",
        title: "File read error",
        description: "Could not read the file. Please try again.",
      })
    }

    reader.readAsText(selectedFile)
  }, [selectedFile, onProcessedData, toast, onAnalysisComplete])

  return {
    selectedFile,
    isProcessing,
    fileInputRef,
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleReset,
    handleAnalyze,
    validateAndSetFile,
    setIsProcessing,
  }
}
