import { Trophy, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppHeader() {
  return (
    <header className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 shadow-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                ChatRank
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300">Telegram Chat Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="backdrop-blur-md bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 shadow-sm"
            >
              <a
                href="https://github.com/mhdsdt/chat-rank"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
