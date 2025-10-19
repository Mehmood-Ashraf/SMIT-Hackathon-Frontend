// reportThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit"
import { reportAPI } from "../api/reportAPI"

// payload is expected to be a FormData instance
export const uploadReport = createAsyncThunk(
  "reports/uploadReport",
  async (formData, thunkAPI) => {
    try {
      const res = await reportAPI.uploadReport(formData)
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error || "Upload failed")
      }
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Upload failed")
    }
  }
)
