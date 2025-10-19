import { createSlice } from "@reduxjs/toolkit"
import { fetchVitals, addVital, deleteVital, fetchVitalTrends } from "../thunks/vitalsThunks"

const initialState = {
  vitals: [],
  trends: {},
  loading: false,
  error: null,
}

const vitalsSlice = createSlice({
  name: "vitals",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch vitals
    builder
      .addCase(fetchVitals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVitals.fulfilled, (state, action) => {
        state.loading = false
        state.vitals = action.payload
      })
      .addCase(fetchVitals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Add vital
    builder.addCase(addVital.fulfilled, (state, action) => {
      state.vitals.unshift(action.payload)
    })

    // Delete vital
    builder.addCase(deleteVital.fulfilled, (state, action) => {
      state.vitals = state.vitals.filter((v) => v.id !== action.payload)
    })

    // Fetch trends
    builder.addCase(fetchVitalTrends.fulfilled, (state, action) => {
      state.trends = action.payload
    })
  },
})

export const { clearError } = vitalsSlice.actions
export default vitalsSlice.reducer
