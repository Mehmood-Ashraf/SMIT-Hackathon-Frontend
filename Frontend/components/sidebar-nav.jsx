"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Heart,
  LayoutDashboard,
  FileText,
  Activity,
  BarChart3,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Activity, label: "Vitals", href: "/vitals" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Timeline", href: "/timeline" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-2">
        <Heart className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold text-sidebar-foreground">HealthMate</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => router.push(item.href)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 bg-transparent"
          onClick={() => {
            localStorage.removeItem("authToken")
            router.push("/login")
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}
