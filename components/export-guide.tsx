import { ExternalLink } from "lucide-react"

export function ExportGuide() {
  return (
    <div className="space-y-6">
      <ol className="list-decimal pl-5 space-y-4">
        <li className="pl-2">
          <div className="font-medium">Install Telegram Desktop</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            If you haven't already, download and install the official Telegram Desktop application.
            <a
              href="https://desktop.telegram.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-1 text-purple-600 dark:text-purple-400 hover:underline"
            >
              Download here
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Navigate to Settings</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Open Telegram Desktop and go to <span className="font-semibold">Settings</span> &rarr;{" "}
            <span className="font-semibold">Advanced</span> &rarr;{" "}
            <span className="font-semibold">Export Telegram Data</span>
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Select Format</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose <span className="font-semibold">Machine-readable JSON</span> as the format
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Optimize File Size (Recommended)</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Deselect media options to keep the file size small and processing faster. You only need the message data for
            this analysis.
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Scope of Export</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Select <span className="font-semibold">All chats</span> for comprehensive analysis
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Export and Upload</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click <span className="font-semibold">Export</span> and wait for the process to complete. Then upload the{" "}
            <span className="font-semibold">result.json</span> file to this application.
          </p>
        </li>
      </ol>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-md p-4 text-sm text-amber-800 dark:text-amber-300">
        <p className="font-medium mb-1">Privacy Note</p>
        <p>
          Your export contains personal conversations. This tool processes your data entirely in your browser - nothing
          is uploaded to any server. For extra privacy, you can disconnect from the internet after the page loads.
        </p>
      </div>
    </div>
  )
}
