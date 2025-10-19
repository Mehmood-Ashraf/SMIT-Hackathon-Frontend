"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Upload, ArrowLeft } from "lucide-react"

export default function UploadReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    reportType: "Blood Test",
    date: "",
    file: null as File | null,
  })
  const [uploading, setUploading] = useState(false)

  const reportTypes = [
    "Blood Test",
    "X-Ray",
    "Ultrasound",
    "CT Scan",
    "MRI",
    "ECG",
    "Prescription",
    "Lab Report",
    "Other",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // DUMMY DATA - Replace with real API call
    console.log("Upload report:", formData)

    // Simulate upload
    setTimeout(() => {
      router.push("/dashboard")
      setUploading(false)
    }, 2000)
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
            <CardTitle>Upload Medical Report</CardTitle>
            <CardDescription>Upload your medical report (PDF or image) for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Report Title</label>
                <Input
                  placeholder="e.g., October Blood Test"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    value={formData.reportType}
                    onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
                  >
                    {reportTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Report Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Upload File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                    required
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PDF, JPG, PNG or GIF (max 10MB)</p>
                    {formData.file && <p className="text-sm text-primary mt-2">{formData.file.name}</p>}
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Report"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
