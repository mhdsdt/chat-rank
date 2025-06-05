import type { TelegramExportData, SortedChatResult } from "@/types"

export function parseTelegramExport(data: TelegramExportData): SortedChatResult[] {
  // Check if the data has the expected structure
  if (!data.chats || !data.chats.list) {
    throw new Error("Invalid Telegram export format")
  }

  // Get the user's own ID from personal information
  let userOwnId: string | null = null
  if (data.personal_information && data.personal_information.user_id) {
    userOwnId = `user${data.personal_information.user_id}`
  }

  // Use a Map with composite keys (name + id) to track unique chats
  const chatCounts = new Map<string, { name: string; id: string; fullName: string; messageCount: number }>()

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

    // Get chat ID - handle different possible ID fields and convert to string
    let chatId = "unknown"
    if (chat.id !== undefined && chat.id !== null) {
      chatId = String(chat.id)
    } else if (chat.chat_id !== undefined && chat.chat_id !== null) {
      chatId = String(chat.chat_id)
    } else if (chat.peer_id !== undefined && chat.peer_id !== null) {
      chatId = String(chat.peer_id)
    }

    // Try to extract full name from messages (excluding user's own messages)
    let fullName = chatName

    // Look through messages to find a sender name that's NOT the user
    if (chat.messages && chat.messages.length > 0 && userOwnId) {
      // Try to find a message with a "from" field that's not from the user
      for (const message of chat.messages) {
        if (
          message.from &&
          typeof message.from === "string" &&
          message.from.trim() &&
          message.from_id &&
          message.from_id !== userOwnId
        ) {
          fullName = message.from.trim()
          break
        }
      }
    } else if (chat.messages && chat.messages.length > 0) {
      // If we don't have user ID, just pick the first non-empty "from" field
      for (const message of chat.messages) {
        if (message.from && typeof message.from === "string" && message.from.trim()) {
          fullName = message.from.trim()
          break
        }
      }
    }

    // Create a unique key using both name and ID
    const uniqueKey = `${chatName}_${chatId}`

    // Add to our map (or update if this exact chat was already processed)
    const existingChat = chatCounts.get(uniqueKey)
    if (existingChat) {
      existingChat.messageCount += messageCount
    } else {
      chatCounts.set(uniqueKey, {
        name: chatName,
        id: chatId,
        fullName: fullName,
        messageCount,
      })
    }
  })

  // Convert to array and sort by message count (descending)
  const sortedChats: SortedChatResult[] = Array.from(chatCounts.values())
    .map(({ name, id, fullName, messageCount }) => ({
      name: name,
      id: id,
      fullName: fullName,
      messageCount,
    }))
    .sort((a, b) => b.messageCount - a.messageCount)

  return sortedChats
}
