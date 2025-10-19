import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchReportsApi, uploadReportApi, deleteReportApi, fetchReportDetailsApi } from "../api/reportsApi"

export const fetchReports = createAsyncThunk("reports/fetchReports", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchReportsApi()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const uploadReport = createAsyncThunk(
  "reports/uploadReport",
  async ({ file, reportData }, { rejectWithValue }) => {
    try {
      const data = await uploadReportApi(file, reportData)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteReport = createAsyncThunk("reports/deleteReport", async (reportId, { rejectWithValue }) => {
  try {
    const data = await deleteReportApi(reportId)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchReportDetails = createAsyncThunk("reports/fetchDetails", async (reportId, { rejectWithValue }) => {
  try {
    const data = await fetchReportDetailsApi(reportId)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
