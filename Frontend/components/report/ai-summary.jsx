"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

// DUMMY DATA - Replace with real API calls
const dummySummary = {
  title: "Blood Test Analysis",
  summary:
    "Your blood test shows mostly normal results with a slightly elevated WBC count. This could indicate a mild infection or inflammation.",
  abnormalValues: [{ parameter: "WBC", value: "12,000", normalRange: "4,500-11,000", severity: "High" }],
  normalValues: [
    { parameter: "RBC", value: "4.8", normalRange: "4.5-5.5" },
    { parameter: "Hemoglobin", value: "14.5", normalRange: "13.5-17.5" },
  ],
  recommendations: ["Drink plenty of water", "Get adequate rest", "Consult your doctor if symptoms persist"],
}

export function AiSummary() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">{dummySummary.title}</h2>
        <p className="text-foreground mb-6">{dummySummary.summary}</p>

        {/* Abnormal Values */}
        {dummySummary.abnormalValues.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-foreground">Abnormal Values</h3>
            </div>
            <div className="space-y-2">
              {dummySummary.abnormalValues.map((value, i) => (
                <div key={i} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-medium text-foreground">{value.parameter}</p>
                  <p className="text-sm text-muted-foreground">
                    Your value: {value.value} (Normal: {value.normalRange})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Normal Values */}
        {dummySummary.normalValues.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-foreground">Normal Values</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dummySummary.normalValues.map((value, i) => (
                <div key={i} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-foreground">{value.parameter}</p>
                  <p className="text-sm text-muted-foreground">{value.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {dummySummary.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default AiSummary
