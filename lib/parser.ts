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

    // Get chat name based on available fields (matching Python logic)
    let chatName = "Unknown Chat"

    if (chat.name && chat.name.trim()) {
      // Group or channel name
      chatName = chat.name.trim()
    } else if (chat.title && chat.title.trim()) {
      // Some chats use 'title' instead of 'name'
      chatName = chat.title.trim()
    } else if (chat.type === "saved_messages" && data.personal_information) {
      // Handle saved messages
      const firstName = data.personal_information.first_name || ""
      const lastName = data.personal_information.last_name || ""
      chatName = `${firstName} ${lastName}`.trim()
      if (!chatName) {
        chatName = "Saved Messages"
      }
    } else if (chat.type === "personal_chat") {
      // Personal chat - use the first and last name if available
      if (chat.first_name && chat.last_name) {
        chatName = `${chat.first_name} ${chat.last_name}`.trim()
      } else if (chat.first_name) {
        chatName = chat.first_name.trim()
      } else if (chat.last_name) {
        chatName = chat.last_name.trim()
      } else {
        chatName = `Unknown Chat (ID: ${chat.id || "N/A"})`
      }
    } else {
      // Fallback to ID-based name
      chatName = `Unknown Chat (ID: ${chat.id || "N/A"})`
    }

    // Count messages
    const messageCount = chat.messages.length

    // Add to our map (or update if chat name already exists)
    const existingCount = chatCounts.get(chatName) || 0
    chatCounts.set(chatName, existingCount + messageCount)
  })

  // Convert to array and sort by message count (descending)
  const sortedChats: SortedChatResult[] = Array.from(chatCounts.entries())
    .map(([name, messageCount]) => ({ name, messageCount }))
    .sort((a, b) => b.messageCount - a.messageCount)

  return sortedChats
}
