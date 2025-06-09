"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileJson, RotateCcw, Loader2 } from "lucide-react"
import { parseTelegramExport } from "@/lib/parser"
import { ExportGuide } from "@/components/export-guide"
import type { AnalyticsResult } from "@/types"

interface FileUploaderProps {
  onProcessedData: (data: AnalyticsResult | null) => void
  setIsProcessing: (isProcessing: boolean) => void
  isProcessing: boolean
  existingData?: AnalyticsResult | null
}

export function FileUploader({ onProcessedData, setIsProcessing, isProcessing, existingData }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Keep the file selected if we have existing data
  useEffect(() => {
    if (existingData && !selectedFile) {
      // Create a dummy file representation to show that data exists
      // This is just for UI state, the actual data is already processed
    }
  }, [existingData, selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
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
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    onProcessedData(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyze = () => {
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
      } catch (error) {
        console.error("Error processing file:", error)
        onProcessedData(null)

        toast({
          variant: "destructive",
          title: "Processing error",
          description: "Could not process the file. Please ensure it's a valid Telegram export.",
        })
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
  }

  // Show that we have data even if no file is currently selected
  const hasFileOrData = selectedFile || existingData

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${
            isDragging
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : "border-slate-300 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
            <FileJson className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {selectedFile
                ? selectedFile.name
                : existingData
                  ? "Data already loaded - select new file to replace"
                  : "Drop your Telegram export JSON file here"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">or click to browse (JSON only)</p>
          </div>
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Export Guide outside of drop area */}
      <div className="text-center">
        <ExportGuide />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleAnalyze} disabled={!hasFileOrData || isProcessing} className="flex-1 min-w-0">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {existingData && !selectedFile ? "Re-analyze Data" : "Analyze Chat History"}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleReset}
          disabled={(!hasFileOrData && !existingData) || isProcessing}
          className="flex-1 min-w-0"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
