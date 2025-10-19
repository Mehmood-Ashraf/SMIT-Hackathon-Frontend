import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchVitalsApi, addVitalApi, deleteVitalApi, fetchVitalTrendsApi } from "../api/vitalsApi"

export const fetchVitals = createAsyncThunk("vitals/fetchVitals", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchVitalsApi()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const addVital = createAsyncThunk("vitals/addVital", async (vitalData, { rejectWithValue }) => {
  try {
    const data = await addVitalApi(vitalData)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteVital = createAsyncThunk("vitals/deleteVital", async (vitalId, { rejectWithValue }) => {
  try {
    const data = await deleteVitalApi(vitalId)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchVitalTrends = createAsyncThunk(
  "vitals/fetchTrends",
  async ({ vitalType, days }, { rejectWithValue }) => {
    try {
      const data = await fetchVitalTrendsApi(vitalType, days)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)
