// Telegram export data types
export interface TelegramMessage {
  id: number
  type: string
  date: string
  from?: string
  from_id?: string
  text: string | { text: string }[]
  [key: string]: any // For other properties we don't explicitly define
}

export interface TelegramChat {
  name?: string
  type: string
  id: number
  first_name?: string
  last_name?: string
  messages: TelegramMessage[]
  [key: string]: any // For other properties we don't explicitly define
}

export interface TelegramChats {
  list: TelegramChat[]
}

export interface TelegramExportData {
  chats: TelegramChats
  [key: string]: any // For other properties we don't explicitly define
}

// Application specific types
export interface SortedChatResult {
  name: string
  messageCount: number
}
