"use client"

import type React from "react"

import type { AnalyticsResult } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileJson, RotateCcw, Loader2 } from "lucide-react"
import { ExportGuide } from "@/components/export-guide"
import { useFileUpload } from "@/hooks/use-file-upload"

interface FileUploaderProps {
  onProcessedData: (data: AnalyticsResult | null) => void
  onAnalysisComplete?: () => void
  existingData?: AnalyticsResult | null
}

export function FileUploader({ onProcessedData, onAnalysisComplete, existingData }: FileUploaderProps) {
  const {
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
  } = useFileUpload({ onProcessedData, onAnalysisComplete })

  const hasFileOrData = selectedFile || existingData

  return (
    <div className="space-y-4">
      <DropZone
        isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        selectedFile={selectedFile}
        existingData={existingData}
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </DropZone>

      <div className="text-center">
        <ExportGuide />
      </div>

      <ActionButtons
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        hasFileOrData={hasFileOrData}
        isProcessing={isProcessing}
        existingData={existingData}
        selectedFile={selectedFile}
      />
    </div>
  )
}

interface DropZoneProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onClick: () => void
  selectedFile: File | null
  existingData?: AnalyticsResult | null
  children: React.ReactNode
}

function DropZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  selectedFile,
  existingData,
  children,
}: DropZoneProps) {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${
          isDragging
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-slate-300 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600"
        }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
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
      {children}
    </div>
  )
}

interface ActionButtonsProps {
  onAnalyze: () => void
  onReset: () => void
  hasFileOrData: boolean
  isProcessing: boolean
  existingData?: AnalyticsResult | null
  selectedFile: File | null
}

function ActionButtons({
  onAnalyze,
  onReset,
  hasFileOrData,
  isProcessing,
  existingData,
  selectedFile,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button onClick={onAnalyze} disabled={!hasFileOrData || isProcessing} className="flex-1 min-w-0">
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
        onClick={onReset}
        disabled={(!hasFileOrData && !existingData) || isProcessing}
        className="flex-1 min-w-0"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  )
}
