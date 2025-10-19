"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function LogVitalPage() {
  const router = useRouter()
  const [selectedVital, setSelectedVital] = useState("")
  const [value, setValue] = useState("")
  const [notes, setNotes] = useState("")
  const [isLogging, setIsLogging] = useState(false)

  const vitalTypes = [
    { name: "Blood Pressure", unit: "mmHg", format: "Systolic/Diastolic (e.g., 120/80)" },
    { name: "Heart Rate", unit: "bpm", format: "Beats per minute" },
    { name: "Temperature", unit: "°F", format: "Fahrenheit" },
    { name: "Weight", unit: "lbs", format: "Pounds" },
    { name: "Blood Glucose", unit: "mg/dL", format: "Milligrams per deciliter" },
    { name: "Oxygen Saturation", unit: "%", format: "Percentage" },
    { name: "Respiratory Rate", unit: "breaths/min", format: "Breaths per minute" },
  ]

  const selectedVitalInfo = vitalTypes.find((v) => v.name === selectedVital)

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedVital || !value) {
      alert("Please select a vital type and enter a value")
      return
    }

    setIsLogging(true)
    // Simulate logging
    setTimeout(() => {
      router.push("/vitals")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Log Health Vital</h1>
          <p className="text-muted-foreground mt-1">Record a new health measurement</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Vital Type Selection */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Vital Type</CardTitle>
              <CardDescription>Choose what to measure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {vitalTypes.map((vital) => (
                <button
                  key={vital.name}
                  onClick={() => setSelectedVital(vital.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedVital === vital.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-medium text-foreground">{vital.name}</p>
                  <p className="text-xs text-muted-foreground">{vital.unit}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Input Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Measurement</CardTitle>
              <CardDescription>
                {selectedVitalInfo ? selectedVitalInfo.format : "Select a vital type to begin"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLog} className="space-y-6">
                {selectedVitalInfo && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {selectedVital} ({selectedVitalInfo.unit})
                      </label>
                      <Input
                        type="text"
                        placeholder={
                          selectedVital === "Blood Pressure" ? "e.g., 120/80" : `Enter ${selectedVital.toLowerCase()}`
                        }
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Notes (Optional)</label>
                      <textarea
                        placeholder="Add any notes about this measurement (e.g., after exercise, before meal)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                      />
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Logged at:</span> Today at{" "}
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLogging}>
                      {isLogging ? "Logging..." : "Log Vital"}
                    </Button>
                  </>
                )}

                {!selectedVitalInfo && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Select a vital type to start logging</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
