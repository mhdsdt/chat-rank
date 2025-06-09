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

export
\
