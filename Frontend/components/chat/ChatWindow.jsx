"use client"

import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchChatMessages } from "@/store/thunks/chatThunks"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"

export const ChatWindow = ({ conversationId }) => {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector((state) => state.chat)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchChatMessages(conversationId))
    }
  }, [conversationId, dispatch])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-muted-foreground">Loading conversation...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-muted-foreground">Start a conversation</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} isUser={message.sender === "user"} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput conversationId={conversationId} />
    </div>
  )
}
