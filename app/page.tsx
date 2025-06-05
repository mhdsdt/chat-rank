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
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-6000" />

        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600/20 dark:to-blue-600/20 rounded-full filter blur-2xl opacity-60 animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-600/20 dark:to-purple-600/20 rounded-full filter blur-2xl opacity-60 animate-float animation-delay-3000" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-2 shadow-lg">
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
                className="backdrop-blur-md bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm"
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

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 relative z-10">
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
        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span>Upload Your Chat Export</span>
            </CardTitle>
            <CardDescription>Select your Telegram chat export JSON file to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50/80 dark:bg-blue-900/30 rounded-md border border-blue-100/50 dark:border-blue-800/50 flex items-start gap-3 backdrop-blur-sm">
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
        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
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
