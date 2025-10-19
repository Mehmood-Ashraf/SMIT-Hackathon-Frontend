"use client"

import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold">HealthMate</span>
        </div>

        {title && <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>}
        {subtitle && <p className="text-center text-muted-foreground mb-8">{subtitle}</p>}

        {children}
      </Card>
    </div>
  )
}
