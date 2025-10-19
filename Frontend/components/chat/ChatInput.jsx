"use client"

import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendChatMessage, uploadReportToChat } from "@/store/thunks/chatThunks"

export const ChatInput = ({ conversationId }) => {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const { loading, uploadingReport } = useSelector((state) => state.chat)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    await dispatch(sendChatMessage({ conversationId, message }))
    setMessage("")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await dispatch(
        uploadReportToChat({
          conversationId,
          file,
          reportData: {
            title: file.name,
            type: "Medical Report",
          },
        }),
      )
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSendMessage} className="flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || uploadingReport}
          className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
          title="Upload report"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          disabled={isUploading}
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your health reports..."
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  )
}
