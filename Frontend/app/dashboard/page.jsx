"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, FileText, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/Header"

// DUMMY DATA - Replace with real API calls
const dummyStats = [
  { icon: FileText, label: "Reports", value: "12", color: "text-blue-500", trend: "+2 this month" },
  { icon: Activity, label: "Vitals Logged", value: "48", color: "text-green-500", trend: "+5 this week" },
  { icon: Heart, label: "Health Score", value: "85%", color: "text-red-500", trend: "+3% improvement" },
  { icon: TrendingUp, label: "Trend", value: "↑ 5%", color: "text-purple-500", trend: "Positive trend" },
]

const dummyRecentReports = [
  { id: 1, title: "Blood Test Report", date: "Oct 15, 2024", status: "Analyzed", category: "Lab Work" },
  { id: 2, title: "X-Ray Results", date: "Oct 10, 2024", status: "Pending", category: "Imaging" },
  { id: 3, title: "Ultrasound Report", date: "Oct 5, 2024", status: "Analyzed", category: "Imaging" },
]

const dummyUpcomingAppointments = [
  { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Oct 25, 2024", time: "2:00 PM" },
  { id: 2, doctor: "Dr. Michael Chen", specialty: "General Practitioner", date: "Oct 28, 2024", time: "10:30 AM" },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dummyStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Reports */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Recent Reports</h2>
                    <p className="text-sm text-muted-foreground mt-1">Your latest medical documents</p>
                  </div>
                  <Button onClick={() => router.push("/reports")} variant="outline" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {dummyRecentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/reports/${report.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{report.title}</p>
                            <p className="text-xs text-muted-foreground">{report.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground">{report.category}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === "Analyzed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Upcoming Appointments</h2>
                  <p className="text-sm text-muted-foreground mt-1">Next scheduled visits</p>
                </div>

                <div className="space-y-4">
                  {dummyUpcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium text-foreground text-sm">{appointment.doctor}</p>
                      <p className="text-xs text-muted-foreground mt-1">{appointment.specialty}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <span>{appointment.date}</span>
                        <span>•</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6 bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/settings")}
                >
                  Schedule Appointment
                </Button>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chat with our AI health assistant for personalized guidance
                  </p>
                </div>
                <Button onClick={() => router.push("/chat")} className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { MessageCircle } from "lucide-react"
