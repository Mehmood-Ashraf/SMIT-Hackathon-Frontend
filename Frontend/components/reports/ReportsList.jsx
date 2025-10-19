"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchReports, deleteReport } from "@/store/thunks/reportsThunks"
import { formatDistanceToNow } from "date-fns"

export const ReportsList = ({ onSelectReport }) => {
  const dispatch = useDispatch()
  const { reports, loading } = useSelector((state) => state.reports)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    dispatch(fetchReports())
  }, [dispatch])

  const reportTypes = ["All", "Blood Test", "X-Ray", "Ultrasound", "CT Scan", "MRI", "ECG", "Prescription"]

  const filteredReports = filter === "All" ? reports : reports.filter((r) => r.type === filter)

  const handleDelete = (reportId) => {
    if (confirm("Are you sure you want to delete this report?")) {
      dispatch(deleteReport(reportId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {reportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filter === type
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-muted-foreground">No reports found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectReport(report)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground truncate">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{report.type}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                    report.status === "Analyzed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{report.aiSummary || "Analyzing..."}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{(report.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                <span>{formatDistanceToNow(new Date(report.uploadedAt), { addSuffix: true })}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectReport(report)
                  }}
                  className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity"
                >
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(report.id)
                  }}
                  className="px-3 py-2 border border-border rounded text-sm hover:bg-muted transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
