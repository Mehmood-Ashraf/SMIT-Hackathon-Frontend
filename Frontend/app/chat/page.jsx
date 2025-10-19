"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Plus, MessageSquare, Clock, AlertCircle } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const dummyChatHistory = [
  {
    id: 1,
    title: "Blood Test Results Discussion",
    lastMessage: "What does high WBC mean?",
    timestamp: "2 hours ago",
    messageCount: 12,
  },
  {
    id: 2,
    title: "Diabetes Management",
    lastMessage: "What foods should I avoid?",
    timestamp: "1 day ago",
    messageCount: 8,
  },
  {
    id: 3,
    title: "Blood Pressure Concerns",
    lastMessage: "Is 140/90 considered high?",
    timestamp: "3 days ago",
    messageCount: 15,
  },
]

const dummyMessages = [
  {
    id: 1,
    sender: "user",
    content: "I just got my blood test results. Can you help me understand them?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "bot",
    content:
      "Of course! I'd be happy to help you understand your blood test results. Please share the key values from your report, and I'll explain what they mean in simple terms.",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    sender: "user",
    content: "My WBC is 12,000 and the normal range is 4,500-11,000. Is this bad?",
    timestamp: "10:32 AM",
  },
  {
    id: 4,
    sender: "bot",
    content:
      "Your WBC (White Blood Cell) count is slightly elevated at 12,000. This could indicate:\n\n• A mild infection or inflammation\n• Stress or physical exertion\n• Certain medications\n• Leukemia (rare)\n\nI recommend discussing this with your doctor, especially if you have symptoms like fever or fatigue.",
    timestamp: "10:33 AM",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [messages, setMessages] = useState(dummyMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        content:
          "Thank you for your question. Based on your medical history and the information provided, here's what I can tell you...",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Chat History */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Button className="w-full gap-2" onClick={() => setSelectedChat(null)}>
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {dummyChatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedChat === chat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <p className="text-xs opacity-75 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {dummyChatHistory.find((c) => c.id === selectedChat)?.title || "New Chat"}
              </h1>
              <p className="text-sm text-muted-foreground">Discuss your medical reports and health concerns</p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              AI Assistant
            </Badge>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-2xl rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground border border-border rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4">
          <div className="max-w-4xl mx-auto">
            {/* Disclaimer */}
            <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">
                This AI assistant provides general health information only. Always consult your doctor for medical
                advice.
              </p>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about your reports, symptoms, or health concerns..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
