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
          <div className="font-medium">Navigate to Export Settings</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Open Telegram Desktop and go to <span className="font-semibold">Settings</span> &rarr;{" "}
            <span className="font-semibold">Advanced</span>. Look for{" "}
            <span className="font-semibold">Export Telegram Data</span> - it's typically one item before the last item
            in the Advanced settings menu.
          </p>
        </li>

        <li className="pl-2">
          <div className="font-medium">Configure Export Options</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-1 space-y-2">
            <p>
              <strong>Keep these checked:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information</li>
              <li>Personal chats</li>
            </ul>
            <p>
              <strong>Uncheck these to reduce file size:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contacts list</li>
              <li>Story archive</li>
              <li>Private groups</li>
              <li>Photos</li>
            </ul>
          </div>
        </li>

        <li className="pl-2">
          <div className="font-medium">Select Format and Export</div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose <span className="font-semibold">Machine-readable JSON</span> as the format, then click{" "}
            <span className="font-semibold">Export</span> and wait for the process to complete. Upload the{" "}
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
