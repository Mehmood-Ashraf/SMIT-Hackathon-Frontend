"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadReport } from "@/store/thunks/reportsThunks"

export const ReportUploadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "Blood Test",
    description: "",
  })
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const dispatch = useDispatch()
  const { uploading, error } = useSelector((state) => state.reports)

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

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !formData.title) return

    await dispatch(uploadReport({ file, reportData: formData }))
    if (!error) {
      onClose()
      setFormData({ title: "", type: "Blood Test", description: "" })
      setFile(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Upload Medical Report</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Report Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Blood Test Report"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Report Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any notes about this report..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
            />
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            {file ? (
              <div className="space-y-2">
                <svg className="w-8 h-8 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h6a1 1 0 00-1-1H6a3 3 0 00-3 3v10a3 3 0 003 3h6a3 3 0 003-3V9a1 1 0 10-2 0v5a1 1 0 11-2 0V4z" />
                </svg>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button type="button" onClick={() => setFile(null)} className="text-xs text-primary hover:underline">
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <svg
                  className="w-8 h-8 text-muted-foreground mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-foreground">Drag and drop your file here</p>
                <p className="text-xs text-muted-foreground">or</p>
                <label className="text-sm text-primary hover:underline cursor-pointer">
                  browse files
                  <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !file || !formData.title}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
