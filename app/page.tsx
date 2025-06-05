"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { ChatScoreboard } from "@/components/chat-scoreboard"
import { ExportGuide } from "@/components/export-guide"
import { Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SortedChatResult } from "@/types"

export default function Home() {
  const [chatData, setChatData] = useState<SortedChatResult[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessedData = (data: SortedChatResult[] | null) => {
    setChatData(data)
    setIsProcessing(false)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Telegram Chat Scoreboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">Uncover your top chats and see who you message the most</p>
        </div>

        <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle>Upload Your Chat Export</CardTitle>
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

        <Tabs defaultValue="scoreboard" className="w-full">
          <TabsList className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>
            <TabsTrigger value="guide">Export Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="scoreboard">
            <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle>Chat Scoreboard</CardTitle>
                <CardDescription>See your most active chats ranked by message count</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatScoreboard data={chatData} isProcessing={isProcessing} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="guide">
            <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 shadow-lg">
              <CardHeader>
                <CardTitle>How to Export Your Telegram Data</CardTitle>
                <CardDescription>Follow these steps to export your chat history from Telegram Desktop</CardDescription>
              </CardHeader>
              <CardContent>
                <ExportGuide />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
