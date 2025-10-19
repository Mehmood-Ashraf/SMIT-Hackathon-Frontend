"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChatLayout({ children }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  // DUMMY DATA - Replace with real authentication check
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
