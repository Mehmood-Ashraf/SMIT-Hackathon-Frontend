"use client"

import { cn } from "@/lib/utils"

export function ChatBubble({ message, isUser }) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs lg:max-w-md rounded-lg p-3 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border border-border",
        )}
      >
        {message}
      </div>
    </div>
  )
}
