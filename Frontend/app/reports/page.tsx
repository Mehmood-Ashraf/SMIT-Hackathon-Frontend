"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Download, Trash2, Eye } from "lucide-react"

export default function ReportsPage() {
  const router = useRouter()
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Blood Test Results",
      date: "2024-10-15",
      type: "Lab Report",
      status: "Analyzed",
      file: "blood_test_oct.pdf",
    },
    {
      id: 2,
      name: "Chest X-Ray",
      date: "2024-10-10",
      type: "Imaging",
      status: "Analyzed",
      file: "xray_chest.pdf",
    },
    {
      id: 3,
      name: "Thyroid Panel",
      date: "2024-10-05",
      type: "Lab Report",
      status: "Pending",
      file: "thyroid_panel.pdf",
    },
    {
      id: 4,
      name: "ECG Report",
      date: "2024-09-28",
      type: "Cardiac",
      status: "Analyzed",
      file: "ecg_report.pdf",
    },
  ])

  const handleDelete = (id: number) => {
    setReports(reports.filter((r) => r.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Analyzed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Reports</h1>
          <p className="text-muted-foreground mt-2">Manage and view your medical reports</p>
        </div>
        <Button onClick={() => router.push("/reports/upload")} className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Report
        </Button>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
          <CardDescription>All your uploaded medical reports and analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Report Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{report.type}</td>
                    <td className="py-3 px-4 text-muted-foreground">{report.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/reports/${report.id}`)}
                          className="p-2 hover:bg-muted rounded transition-colors"
                          title="View report"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 hover:bg-muted rounded transition-colors"
                          title="Download report"
                        >
                          <Download className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-2 hover:bg-destructive/10 rounded transition-colors"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
