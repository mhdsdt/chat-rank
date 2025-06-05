import type { TelegramExportData, SortedChatResult } from "@/types"

export function parseTelegramExport(data: TelegramExportData): SortedChatResult[] {
  // Check if the data has the expected structure
  if (!data.chats || !data.chats.list) {
    throw new Error("Invalid Telegram export format")
  }

  const chatCounts = new Map<string, number>()

  // Process each chat in the export
  data.chats.list.forEach((chat) => {
    // Skip empty chats
    if (!chat.messages || chat.messages.length === 0) {
      return
    }

    // Get chat name based on type
    let chatName = "Unknown Chat"

    if (chat.name) {
      // Group or channel name
      chatName = chat.name
    } else if (chat.type === "personal_chat") {
      // Personal chat - use the first and last name if available
      if (chat.first_name && chat.last_name) {
        chatName = `${chat.first_name} ${chat.last_name}`
      } else if (chat.first_name) {
        chatName = chat.first_name
      } else if (chat.last_name) {
        chatName = chat.last_name
      }
    }

    // Count messages
    const messageCount = chat.messages.length

    // Add to our map
    chatCounts.set(chatName, messageCount)
  })

  // Convert to array and sort by message count (descending)
  const sortedChats: SortedChatResult[] = Array.from(chatCounts.entries())
    .map(([name, messageCount]) => ({ name, messageCount }))
    .sort((a, b) => b.messageCount - a.messageCount)

  return sortedChats
}
