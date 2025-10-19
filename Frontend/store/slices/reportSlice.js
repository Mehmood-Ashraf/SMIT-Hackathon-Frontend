// reportSlice.js
import { createSlice } from "@reduxjs/toolkit"
import { uploadReport } from "../thunks/reportThunks"

const initialState = {
  items: [], // uploaded reports
  status: "idle", // idle | loading | succeeded | failed
  error: null,
}

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    resetUploadState(state) {
      state.status = "idle"
      state.error = null
    },
    // add other reducers if needed
  },
  extraReducers(builder) {
    builder
      .addCase(uploadReport.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(uploadReport.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.error = null
        // push returned report meta into items array
        state.items.unshift(action.payload)
      })
      .addCase(uploadReport.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetUploadState } = reportSlice.actions
export default reportSlice.reducer
