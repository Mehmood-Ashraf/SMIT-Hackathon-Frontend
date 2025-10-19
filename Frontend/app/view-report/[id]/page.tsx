"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Download, Share2 } from "lucide-react"
import AiSummary from "@/components/report/ai-summary"

// DUMMY DATA - Replace with real API call
const dummyReport = {
  id: "1",
  title: "Blood Test Report",
  type: "Blood Test",
  date: "2024-10-15",
  fileName: "blood-test-oct.pdf",
  fileUrl: "/blood-test-report.jpg",
  status: "Analyzed",
  aiInsight: {
    summaryEnglish:
      "Your blood test shows mostly normal results. WBC count is slightly elevated at 7.5 (normal: 4.5-11.0), which could indicate a minor infection or stress. Hemoglobin is normal at 14.2 g/dL. All other parameters are within normal range.",
    summaryUrdu:
      "آپ کے خون کی جانچ میں زیادہ تر نتائج معمول کے مطابق ہیں۔ WBC کی تعداد 7.5 پر قدرے بلند ہے (معمول: 4.5-11.0)، جو معمولی انفیکشن یا تناؤ کی نشاندہی کر سکتا ہے۔ ہیموگلوبن 14.2 g/dL پر معمول کے مطابق ہے۔",
    abnormalValues: [
      {
        parameter: "WBC Count",
        value: "7.5",
        normalRange: "4.5-11.0",
        severity: "Low",
        explanation: "Slightly elevated, could indicate minor infection",
      },
    ],
    normalValues: [
      { parameter: "Hemoglobin", value: "14.2", normalRange: "13.5-17.5" },
      { parameter: "Platelets", value: "250", normalRange: "150-400" },
    ],
    doctorQuestions: [
      "What does elevated WBC mean?",
      "Should I take any medication?",
      "When should I get tested again?",
    ],
    foodsToAvoid: ["Spicy food", "High sodium items"],
    recommendedFoods: ["Green vegetables", "Lean proteins", "Fruits"],
    homeRemedies: ["Drink plenty of water", "Get adequate rest", "Manage stress"],
  },
}

export default function ViewReportPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "ur">("en")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">HealthMate</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80"
            >
              {language === "en" ? "اردو" : "EN"}
            </button>
            <Button variant="outline" size="icon">
              <Download className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{dummyReport.title}</CardTitle>
                    <CardDescription>{dummyReport.date}</CardDescription>
                  </div>
                  <Badge>{dummyReport.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg overflow-hidden">
                  <img src={dummyReport.fileUrl || "/placeholder.svg"} alt="Report preview" className="w-full h-auto" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Summary */}
          <div className="lg:col-span-1">
            <AiSummary insight={dummyReport.aiInsight} language={language} />
          </div>
        </div>
      </main>
    </div>
  )
}
