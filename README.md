# ChatRank - Telegram Chat Analytics

A Next.js 15 application that allows users to upload their Telegram chat export JSON file and display a sorted scoreboard of their most chatted contacts/groups based on message count.

## Repository

GitHub: [https://github.com/mhdsdt/chat-rank](https://github.com/mhdsdt/chat-rank)

## Features

- Upload and analyze Telegram chat export JSON files
- Display a sorted scoreboard of most active chats with rankings and medals
- Client-side processing (no data is sent to any server)
- Modern glassmorphism design with beautiful header
- Responsive UI for all device sizes
- Dark mode support
- Integrated export guide

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React for icons
- pnpm for package management

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/mhdsdt/chat-rank.git
cd chat-rank
\`\`\`

2. Install dependencies with pnpm:

\`\`\`bash
pnpm install
\`\`\`

3. Run the development server:

\`\`\`bash
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Shadcn UI Components

This project uses Shadcn UI components. If you need to add more components, use the following command:

\`\`\`bash
npx shadcn@latest add <component-name>
\`\`\`

For example:

\`\`\`bash
npx shadcn@latest add dropdown-menu
\`\`\`

## Design Features

### Beautiful Header
- Sticky navigation with glassmorphism effect
- ChatRank branding with trophy icon
- Direct link to GitHub repository
- Responsive design

### Glassmorphism Design

This application implements a glassmorphism design with the following characteristics:

- Frosted glass effect using backdrop-blur
- Semi-transparent backgrounds
- Subtle borders
- Soft shadows
- Depth through layering

The glassmorphism effect is achieved through Tailwind CSS classes and custom styles in the globals.css file.

### Enhanced User Experience
- Medal system for top 3 chats (🥇🥈🥉)
- Integrated export guide as tabs
- Better organization of content
- Improved visual hierarchy

## Privacy

This application processes all data entirely in the browser. Your Telegram chat export is never uploaded to any server or stored anywhere outside your browser. After processing, the data exists only in your browser's memory and is cleared when you refresh or close the page.

## License

MIT
