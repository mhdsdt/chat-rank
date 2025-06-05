"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { ChatScoreboard } from "@/components/chat-scoreboard"
import { ThemeToggle } from "@/components/theme-toggle"
import { Info, Github, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SortedChatResult } from "@/types"

export default function Home() {
  const [chatData, setChatData] = useState<SortedChatResult[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessedData = (data: SortedChatResult[] | null) => {
    setChatData(data)
    setIsProcessing(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  ChatRank
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Telegram Chat Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="backdrop-blur-md bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              >
                <a
                  href="https://github.com/mhdsdt/chat-rank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
            Discover Your Top Telegram Chats
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Upload your Telegram chat export and see who you message the most. Get insights into your communication
            patterns with beautiful analytics.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span>Upload Your Chat Export</span>
            </CardTitle>
            <CardDescription>Select your Telegram chat export JSON file to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-100 dark:border-blue-800 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your data is processed entirely in your browser and is never uploaded or saved on our servers. We
                prioritize your privacy.
              </p>
            </div>
            <FileUploader onProcessedData={handleProcessedData} setIsProcessing={setIsProcessing} />
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span>Your Chat Rankings</span>
            </CardTitle>
            <CardDescription>See your most active chats ranked by message count</CardDescription>
          </CardHeader>
          <CardContent>
            <ChatScoreboard data={chatData} isProcessing={isProcessing} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
