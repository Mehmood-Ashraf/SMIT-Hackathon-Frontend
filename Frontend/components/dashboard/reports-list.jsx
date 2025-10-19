"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// DUMMY DATA - Replace with real API calls
const dummyReports = [
  { id: 1, title: "Blood Test Report", date: "Oct 15, 2024", status: "Analyzed" },
  { id: 2, title: "X-Ray Results", date: "Oct 10, 2024", status: "Pending" },
  { id: 3, title: "Ultrasound Report", date: "Oct 5, 2024", status: "Analyzed" },
]

export function ReportsList() {
  const router = useRouter()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Reports</h2>
        <Button onClick={() => router.push("/reports")}>View All</Button>
      </div>

      <div className="space-y-4">
        {dummyReports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">{report.title}</p>
              <p className="text-sm text-muted-foreground">{report.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                report.status === "Analyzed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
