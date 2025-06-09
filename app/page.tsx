"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { ChatScoreboard } from "@/components/chat-scoreboard/chat-scoreboard"
import { AppHeader } from "@/components/layout/app-header"
import { AnimatedBackground } from "@/components/layout/background"
import { PrivacyNotice } from "@/components/layout/privacy-notice"
import { SuccessNotice } from "@/components/layout/success-notice"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { useViewState } from "@/hooks/use-view-state"
import type { AnalyticsResult } from "@/types"

export default function Home() {
  const [chatData, setChatData] = useState<AnalyticsResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { currentView, handleBackToUpload, handleViewAnalytics } = useViewState("upload")

  const handleProcessedData = (data: AnalyticsResult | null) => {
    setChatData(data)
    setIsProcessing(false)
  }

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <AnimatedBackground />
      <AppHeader />

      <div className="flex-1 overflow-hidden">
        {currentView === "upload" ? (
          <UploadView
            chatData={chatData}
            onProcessedData={handleProcessedData}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            onViewAnalytics={handleViewAnalytics}
          />
        ) : (
          <AnalyticsView chatData={chatData} isProcessing={isProcessing} onBackToUpload={handleBackToUpload} />
        )}
      </div>
    </main>
  )
}

interface UploadViewProps {
  chatData: AnalyticsResult | null
  onProcessedData: (data: AnalyticsResult | null) => void
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
  onViewAnalytics: () => void
}

function UploadView({ chatData, onProcessedData, isProcessing, setIsProcessing, onViewAnalytics }: UploadViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-3 pt-8 h-full">
      <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-purple-500" />
            <span>Upload Your Chat Export</span>
          </CardTitle>
          <CardDescription>Select your Telegram chat export JSON file to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <PrivacyNotice />
          <FileUploader onProcessedData={onProcessedData} existingData={chatData} />
          {chatData && <SuccessNotice data={chatData} onViewAnalytics={onViewAnalytics} />}
        </CardContent>
      </Card>
    </div>
  )
}

interface AnalyticsViewProps {
  chatData: AnalyticsResult | null
  isProcessing: boolean
  onBackToUpload: () => void
}

function AnalyticsView({ chatData, isProcessing, onBackToUpload }: AnalyticsViewProps) {
  return (
    <div className="h-full p-3 flex justify-center">
      <div className="w-full max-w-6xl">
        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 shadow-xl h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-purple-500" />
                  <span>Chat Analytics</span>
                </CardTitle>
                <CardDescription>Explore your Telegram chat insights</CardDescription>
              </div>
              <Button variant="outline" onClick={onBackToUpload} size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)] overflow-hidden p-3">
            <ChatScoreboard data={chatData} isProcessing={isProcessing} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
