"use client"

import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"

export default function ReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.id

  // Mock report data
  const report = {
    id: reportId,
    name: "Blood Test Results",
    date: "2024-10-15",
    type: "Lab Report",
    status: "Analyzed",
    doctor: "Dr. Sarah Johnson",
    hospital: "City Medical Center",
    analysis:
      "Your blood test results show normal levels across all major indicators. Hemoglobin, white blood cell count, and platelet levels are all within healthy ranges. Your cholesterol levels are slightly elevated; consider reducing saturated fat intake and increasing physical activity.",
    keyFindings: [
      { label: "Hemoglobin", value: "14.5 g/dL", status: "Normal" },
      { label: "White Blood Cells", value: "7.2 K/uL", status: "Normal" },
      { label: "Platelets", value: "245 K/uL", status: "Normal" },
      { label: "Total Cholesterol", value: "215 mg/dL", status: "Elevated" },
      { label: "Glucose", value: "95 mg/dL", status: "Normal" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{report.name}</h1>
          <p className="text-muted-foreground mt-1">{report.date}</p>
        </div>
      </div>

      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{report.type}</CardTitle>
              <CardDescription>
                Analyzed by {report.doctor} at {report.hospital}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{report.analysis}</p>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.keyFindings.map((finding, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{finding.label}</p>
                  <p className="text-sm text-muted-foreground">{finding.value}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    finding.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {finding.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Maintain a balanced diet with reduced saturated fats</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Increase physical activity to at least 150 minutes per week</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Schedule a follow-up appointment in 3 months</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Monitor cholesterol levels regularly</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
