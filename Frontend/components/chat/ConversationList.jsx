"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentConversation } from "@/store/slices/chatSlice"
import { formatDistanceToNow } from "date-fns"

export const ConversationList = ({ onSelectConversation }) => {
  const dispatch = useDispatch()
  const { conversations, currentConversation } = useSelector((state) => state.chat)

  useEffect(() => {
    // Fetch conversations on mount
    const fetchConversationsThunk = async () => {
      const { fetchConversations: fetchConversationsApi } = await import("@/store/thunks/chatThunks")
      dispatch(fetchConversationsApi())
    }
    fetchConversationsThunk()
  }, [dispatch])

  const handleSelectConversation = (conversation) => {
    dispatch(setCurrentConversation(conversation))
    onSelectConversation(conversation.id)
  }

  return (
    <div className="w-full md:w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          New Conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation)}
            className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted transition-colors ${
              currentConversation?.id === conversation.id ? "bg-muted" : ""
            }`}
          >
            <h3 className="font-semibold text-sm text-foreground truncate">{conversation.title}</h3>
            <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
            </p>
            {conversation.unread > 0 && (
              <span className="inline-block mt-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                {conversation.unread} new
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
