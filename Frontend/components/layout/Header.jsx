"use client"

import { useSelector } from "react-redux"
import { Bell, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const Header = () => {
  const { user } = useSelector((state) => state.user)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, {user?.firstName || "User"}</h2>
        <p className="text-sm text-muted-foreground">Manage your health records and chat with our AI assistant</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
          <Settings className="w-5 h-5 text-foreground" />
        </Button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold cursor-pointer hover:opacity-90 transition-opacity">
          {user?.firstName?.charAt(0) || "U"}
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="w-5 h-5 text-foreground" />
        </Button>
      </div>
    </header>
  )
}
