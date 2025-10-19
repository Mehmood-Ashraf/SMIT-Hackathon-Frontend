import { formatDistanceToNow } from "date-fns"

export const ChatMessage = ({ message, isUser }) => {
  const formatTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  }

  if (message.type === "report") {
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h6a1 1 0 00-1-1H6a3 3 0 00-3 3v10a3 3 0 003 3h6a3 3 0 003-3V9a1 1 0 10-2 0v5a1 1 0 11-2 0V4z" />
            </svg>
            <span className="font-semibold text-sm">{message.reportData.fileName}</span>
          </div>
          <p className="text-xs opacity-75">{(message.reportData.fileSize / 1024 / 1024).toFixed(2)} MB</p>
          <p className="text-sm mt-2">{message.reportData.analysis}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-2 ${isUser ? "opacity-70" : "opacity-60"}`}>{formatTime(message.timestamp)}</p>
      </div>
    </div>
  )
}
