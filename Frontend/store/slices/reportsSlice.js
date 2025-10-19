import { createSlice } from "@reduxjs/toolkit"
import { fetchReports, uploadReport, deleteReport, fetchReportDetails } from "../thunks/reportsThunks"

const initialState = {
  reports: [],
  currentReport: null,
  loading: false,
  uploading: false,
  error: null,
}

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch reports
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Upload report
    builder
      .addCase(uploadReport.pending, (state) => {
        state.uploading = true
        state.error = null
      })
      .addCase(uploadReport.fulfilled, (state, action) => {
        state.uploading = false
        state.reports.unshift(action.payload)
      })
      .addCase(uploadReport.rejected, (state, action) => {
        state.uploading = false
        state.error = action.payload
      })

    // Delete report
    builder.addCase(deleteReport.fulfilled, (state, action) => {
      state.reports = state.reports.filter((r) => r.id !== action.payload)
    })

    // Fetch report details
    builder.addCase(fetchReportDetails.fulfilled, (state, action) => {
      state.currentReport = action.payload
    })
  },
})

export const { setCurrentReport, clearError } = reportsSlice.actions
export default reportsSlice.reducer
