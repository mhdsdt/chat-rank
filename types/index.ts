// Telegram export data types
export interface TelegramMessage {
  id: number
  type: string
  date: string
  from?: string
  from_id?: string
  text: string | { text: string }[]
  [key: string]: any
}

export interface TelegramChat {
  name?: string
  title?: string
  type: string
  id?: number
  chat_id?: number
  peer_id?: number
  first_name?: string
  last_name?: string
  messages: TelegramMessage[]
  [key: string]: any
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
  [key: string]: any
}

// Application specific types
export interface SortedChatResult {
  name: string
  id: string
  fullName: string
  messageCount: number
}

// Message activity analytics types
export interface MessageActivityData {
  date: string
  messageCount: number
}

export interface MessageActivityAnalytics {
  daily: MessageActivityData[]
  weekly: MessageActivityData[]
  monthly: MessageActivityData[]
}

// Enhanced result type with analytics
export interface AnalyticsResult {
  chats: SortedChatResult[]
  messageActivity: MessageActivityAnalytics
}

// UI component types
export type ViewState = "upload" | "analytics"
export type TimeRange = "daily" | "weekly" | "monthly"

// Hook types
export interface PaginationConfig {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

export interface SearchConfig<T> {
  items: T[]
  searchFields: (keyof T)[]
  initialQuery?: string
}
