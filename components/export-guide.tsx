import { ExternalLink, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ExportGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-purple-600 dark:text-purple-400 hover:underline">
          <HelpCircle className="h-4 w-4 mr-1" />
          How to Export?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
        <DialogHeader>
          <DialogTitle>How to Export Telegram Data</DialogTitle>
          <DialogDescription>Follow these steps to export your Telegram chat data for analysis</DialogDescription>
        </DialogHeader>
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
                <span className="font-semibold">Export Telegram Data</span> - it's typically one item before the last
                item in the Advanced settings menu.
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
