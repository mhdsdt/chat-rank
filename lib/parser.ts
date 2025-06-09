import type {
  TelegramExportData,
  SortedChatResult,
  MessageActivityAnalytics,
  MessageActivityData,
  AnalyticsResult,
  TelegramChat,
} from "@/types"

export function parseTelegramExport(data: TelegramExportData): AnalyticsResult {
  validateExportData(data)

  const userOwnId = extractUserOwnId(data)
  const chatResults = processChatData(data.chats.list, userOwnId)
  const allMessages = extractAllMessages(data.chats.list)
  const messageActivity = generateMessageActivityAnalytics(allMessages)

  return {
    chats: chatResults,
    messageActivity,
  }
}

function validateExportData(data: TelegramExportData): void {
  if (!data.chats || !data.chats.list) {
    throw new Error("Invalid Telegram export format")
  }
}

function extractUserOwnId(data: TelegramExportData): string | null {
  if (data.personal_information && data.personal_information.user_id) {
    return `user${data.personal_information.user_id}`
  }
  return null
}

function extractAllMessages(chats: TelegramChat[]): { date: string }[] {
  const allMessages: { date: string }[] = []

  chats.forEach((chat) => {
    if (!chat.messages || chat.messages.length === 0) return

    chat.messages.forEach((message) => {
      if (message.date) {
        allMessages.push({ date: message.date })
      }
    })
  })

  return allMessages
}

function processChatData(chats: TelegramChat[], userOwnId: string | null): SortedChatResult[] {
  const chatCounts = new Map<string, { name: string; id: string; fullName: string; messageCount: number }>()

  chats.forEach((chat) => {
    if (!chat.messages || chat.messages.length === 0) return

    const chatName = extractChatName(chat)
    const chatId = extractChatId(chat)
    const messageCount = chat.messages.length
    const fullName = extractFullName(chat, userOwnId)

    const uniqueKey = `${chatName}_${chatId}`

    const existingChat = chatCounts.get(uniqueKey)
    if (existingChat) {
      existingChat.messageCount += messageCount
    } else {
      chatCounts.set(uniqueKey, {
        name: chatName,
        id: chatId,
        fullName,
        messageCount,
      })
    }
  })

  return Array.from(chatCounts.values())
    .map(({ name, id, fullName, messageCount }) => ({
      name,
      id,
      fullName,
      messageCount,
    }))
    .sort((a, b) => b.messageCount - a.messageCount)
}

function extractChatName(chat: TelegramChat): string {
  if (chat.name && chat.name.trim()) {
    return chat.name.trim()
  }

  if (chat.title && chat.title.trim()) {
    return chat.title.trim()
  }

  if (chat.type === "saved_messages") {
    return "Saved Messages"
  }

  if (chat.type === "personal_chat") {
    if (chat.first_name && chat.last_name) {
      return `${chat.first_name} ${chat.last_name}`.trim()
    }

    if (chat.first_name) {
      return chat.first_name.trim()
    }

    if (chat.last_name) {
      return chat.last_name.trim()
    }
  }

  return `Unknown Chat (ID: ${chat.id || "N/A"})`
}

function extractChatId(chat: TelegramChat): string {
  if (chat.id !== undefined && chat.id !== null) {
    return String(chat.id)
  }

  if (chat.chat_id !== undefined && chat.chat_id !== null) {
    return String(chat.chat_id)
  }

  if (chat.peer_id !== undefined && chat.peer_id !== null) {
    return String(chat.peer_id)
  }

  return "unknown"
}

function extractFullName(chat: TelegramChat, userOwnId: string | null): string {
  const chatName = extractChatName(chat)

  if (!chat.messages || chat.messages.length === 0) {
    return chatName
  }

  if (userOwnId) {
    for (const message of chat.messages) {
      if (
        message.from &&
        typeof message.from === "string" &&
        message.from.trim() &&
        message.from_id &&
        message.from_id !== userOwnId
      ) {
        return message.from.trim()
      }
    }
  } else {
    for (const message of chat.messages) {
      if (message.from && typeof message.from === "string" && message.from.trim()) {
        return message.from.trim()
      }
    }
  }

  return chatName
}

function generateMessageActivityAnalytics(messages: { date: string }[]): MessageActivityAnalytics {
  const dailyCounts = new Map<string, number>()
  const weeklyCounts = new Map<string, number>()
  const monthlyCounts = new Map<string, number>()

  messages.forEach(({ date }) => {
    try {
      const messageDate = new Date(date)
      if (isNaN(messageDate.getTime())) return

      aggregateByTimeframe(messageDate, dailyCounts, weeklyCounts, monthlyCounts)
    } catch (error) {
      // Skip invalid dates
    }
  })

  return {
    daily: convertMapToSortedArray(dailyCounts),
    weekly: convertMapToSortedArray(weeklyCounts),
    monthly: convertMapToSortedArray(monthlyCounts),
  }
}

function aggregateByTimeframe(
  date: Date,
  dailyCounts: Map<string, number>,
  weeklyCounts: Map<string, number>,
  monthlyCounts: Map<string, number>,
): void {
  // Daily aggregation (YYYY-MM-DD)
  const dailyKey = date.toISOString().split("T")[0]
  dailyCounts.set(dailyKey, (dailyCounts.get(dailyKey) || 0) + 1)

  // Weekly aggregation (YYYY-WW)
  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay())
  const weeklyKey = weekStart.toISOString().split("T")[0]
  weeklyCounts.set(weeklyKey, (weeklyCounts.get(weeklyKey) || 0) + 1)

  // Monthly aggregation (YYYY-MM)
  const monthlyKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
  monthlyCounts.set(monthlyKey, (monthlyCounts.get(monthlyKey) || 0) + 1)
}

function convertMapToSortedArray(map: Map<string, number>): MessageActivityData[] {
  return Array.from(map.entries())
    .map(([date, messageCount]) => ({ date, messageCount }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
