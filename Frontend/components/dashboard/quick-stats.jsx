"use client"

import { Card } from "@/components/ui/card"
import { Heart, TrendingUp, FileText, Activity } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const stats = [
  { icon: FileText, label: "Reports", value: "12", color: "text-blue-500" },
  { icon: Activity, label: "Vitals Logged", value: "48", color: "text-green-500" },
  { icon: Heart, label: "Health Score", value: "85%", color: "text-red-500" },
  { icon: TrendingUp, label: "Trend", value: "↑ 5%", color: "text-purple-500" },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
