"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, TrendingUp, TrendingDown, Activity } from "lucide-react"

export default function VitalsPage() {
  const router = useRouter()
  const [vitals, setVitals] = useState([
    {
      id: 1,
      type: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      date: "Today",
      time: "09:30 AM",
      status: "Normal",
      trend: "stable",
    },
    {
      id: 2,
      type: "Heart Rate",
      value: "72",
      unit: "bpm",
      date: "Today",
      time: "09:30 AM",
      status: "Normal",
      trend: "up",
    },
    {
      id: 3,
      type: "Temperature",
      value: "98.6",
      unit: "°F",
      date: "Today",
      time: "08:00 AM",
      status: "Normal",
      trend: "stable",
    },
    {
      id: 4,
      type: "Weight",
      value: "165",
      unit: "lbs",
      date: "Yesterday",
      time: "07:00 AM",
      status: "Normal",
      trend: "down",
    },
    {
      id: 5,
      type: "Blood Glucose",
      value: "95",
      unit: "mg/dL",
      date: "Yesterday",
      time: "06:30 AM",
      status: "Normal",
      trend: "stable",
    },
    {
      id: 6,
      type: "Oxygen Saturation",
      value: "98",
      unit: "%",
      date: "2 days ago",
      time: "10:00 AM",
      status: "Normal",
      trend: "stable",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-800"
      case "High":
        return "bg-red-100 text-red-800"
      case "Low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Health Vitals</h1>
          <p className="text-muted-foreground mt-2">Track and manage your daily health metrics</p>
        </div>
        <Button onClick={() => router.push("/vitals/log")} className="gap-2">
          <Plus className="w-4 h-4" />
          Log Vital
        </Button>
      </div>

      {/* Vitals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitals.map((vital) => (
          <Card key={vital.id} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{vital.type}</CardTitle>
                {getTrendIcon(vital.trend)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {vital.value}
                  <span className="text-lg text-muted-foreground ml-1">{vital.unit}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>{vital.date}</p>
                  <p>{vital.time}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(vital.status)}`}>
                  {vital.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vitals History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vitals History</CardTitle>
          <CardDescription>Your latest vital measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vitals.slice(0, 5).map((vital) => (
              <div
                key={vital.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{vital.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {vital.date} at {vital.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {vital.value} {vital.unit}
                  </p>
                  <span className={`text-xs font-medium ${getStatusColor(vital.status)}`}>{vital.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
