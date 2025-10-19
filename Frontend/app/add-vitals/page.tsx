"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"

export default function AddVitalsPage() {
  const router = useRouter()
  const [vitalType, setVitalType] = useState("Blood Pressure")
  const [formData, setFormData] = useState({
    value: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
  })
  const [saving, setSaving] = useState(false)

  const vitalTypes = [
    { name: "Blood Pressure", unit: "mmHg", placeholder: "130/80" },
    { name: "Blood Sugar", unit: "mg/dL", placeholder: "95" },
    { name: "Weight", unit: "kg", placeholder: "75" },
    { name: "Height", unit: "cm", placeholder: "180" },
    { name: "Temperature", unit: "°C", placeholder: "37" },
    { name: "Heart Rate", unit: "bpm", placeholder: "72" },
    { name: "Oxygen Level", unit: "%", placeholder: "98" },
  ]

  const currentVital = vitalTypes.find((v) => v.name === vitalType)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // DUMMY DATA - Replace with real API call
    console.log("Add vital:", { vitalType, ...formData })

    // Simulate save
    setTimeout(() => {
      router.push("/dashboard")
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">HealthMate</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Health Vital</CardTitle>
            <CardDescription>Record your health measurements manually</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Vital Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {vitalTypes.map((vital) => (
                    <button
                      key={vital.name}
                      type="button"
                      onClick={() => setVitalType(vital.name)}
                      className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        vitalType === vital.name
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {vital.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Value ({currentVital?.unit})</label>
                <Input
                  placeholder={currentVital?.placeholder}
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Notes (Optional)</label>
                <textarea
                  placeholder="e.g., Measured after exercise, Before breakfast"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? "Saving..." : "Save Vital"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
