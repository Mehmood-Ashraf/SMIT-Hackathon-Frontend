"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// DUMMY DATA - Replace with real API calls
const dummyVitals = [
  { id: 1, type: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal" },
  { id: 2, type: "Blood Sugar", value: "95", unit: "mg/dL", status: "Normal" },
  { id: 3, type: "Weight", value: "75", unit: "kg", status: "Normal" },
]

export function VitalsList() {
  const router = useRouter()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Vitals</h2>
        <Button onClick={() => router.push("/vitals/log")}>Add Vital</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dummyVitals.map((vital) => (
          <div key={vital.id} className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">{vital.type}</p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {vital.value} <span className="text-sm text-muted-foreground">{vital.unit}</span>
            </p>
            <p className="text-xs text-green-600 mt-2">{vital.status}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
