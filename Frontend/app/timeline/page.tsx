"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Heart, Activity, AlertCircle, CheckCircle } from "lucide-react"

export default function TimelinePage() {
  const events = [
    {
      id: 1,
      type: "report",
      title: "Blood Test Results Analyzed",
      description: "Your recent blood test shows normal levels across all indicators",
      date: "Oct 15, 2024",
      time: "2:30 PM",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "vital",
      title: "Blood Pressure Check",
      description: "Recorded: 120/80 mmHg - Normal range",
      date: "Oct 15, 2024",
      time: "9:30 AM",
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 3,
      type: "activity",
      title: "Exercise Session Completed",
      description: "30 minutes of cardio - 250 calories burned",
      date: "Oct 14, 2024",
      time: "6:00 PM",
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      type: "alert",
      title: "Health Alert",
      description: "Reminder: Schedule your annual checkup",
      date: "Oct 13, 2024",
      time: "10:00 AM",
      icon: AlertCircle,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 5,
      type: "report",
      title: "Chest X-Ray Completed",
      description: "Imaging results are normal, no abnormalities detected",
      date: "Oct 10, 2024",
      time: "3:15 PM",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 6,
      type: "milestone",
      title: "Health Goal Achieved",
      description: "Completed 30 days of consistent exercise",
      date: "Oct 8, 2024",
      time: "11:45 AM",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 7,
      type: "vital",
      title: "Weight Recorded",
      description: "Current weight: 165 lbs - Down 5 lbs from last month",
      date: "Oct 5, 2024",
      time: "7:00 AM",
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 8,
      type: "report",
      title: "Thyroid Panel Results",
      description: "All thyroid function tests within normal range",
      date: "Oct 1, 2024",
      time: "1:20 PM",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Health Timeline</h1>
        <p className="text-muted-foreground mt-2">Your complete health journey and milestones</p>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>All your health events and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {events.map((event, index) => {
              const Icon = event.icon
              return (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline line and dot */}
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full ${event.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index !== events.length - 1 && <div className="w-0.5 h-16 bg-border mt-2"></div>}
                  </div>

                  {/* Event content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-muted-foreground">{event.date}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["All", "Reports", "Vitals", "Activity", "Alerts", "Milestones"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium text-foreground"
              >
                {filter}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
