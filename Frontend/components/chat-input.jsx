"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("")

  const handleSend = () => {
    if (value.trim()) {
      onSend(value)
      setValue("")
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
      />
      <Button onClick={handleSend} disabled={disabled || !value.trim()} size="icon">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
