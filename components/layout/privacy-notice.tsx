import { Info } from "lucide-react"

export function PrivacyNotice() {
  return (
    <div className="mb-4 p-3 bg-blue-50/80 dark:bg-blue-900/30 rounded-md border border-blue-100/50 dark:border-blue-800/50 flex items-start gap-3 backdrop-blur-sm">
      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-700 dark:text-blue-300">
        <p>
          Data processed in your browser only. <strong>Disconnect from the internet</strong> for extra privacy.
        </p>
      </div>
    </div>
  )
}
