"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // DUMMY DATA - Replace with real authentication check
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
