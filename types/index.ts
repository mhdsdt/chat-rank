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
  title?: string // Some chats use 'title' instead of 'name'
  type: string
  id?: number
  chat_id?: number // Alternative ID field
  peer_id?: number // Another possible ID field
  first_name?: string
  last_name?: string
  messages: TelegramMessage[]
  [key: string]: any // For other properties we don't explicitly define
}

export interface TelegramChats {
  list: TelegramChat[]
}

export interface PersonalInformation {
  first_name?: string
  last_name?: string
  user_id?: number
  [key: string]: any
}

export interface TelegramExportData {
  chats: TelegramChats
  personal_information?: PersonalInformation
  [key: string]: any // For other properties we don't explicitly define
}

// Application specific types
export interface SortedChatResult {
  name: string
  id: string
  fullName: string
  messageCount: number
}
