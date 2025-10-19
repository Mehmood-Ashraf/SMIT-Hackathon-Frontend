// src/store/familySlice.js
import { createSlice } from "@reduxjs/toolkit"
import { fetchFamilyMembers, addFamilyMember, deleteFamilyMember } from "../thunks/familyThunk"

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
}

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    resetFamilyState(state) {
      state.items = []
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      // fetch
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchFamilyMembers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || action.error.message
      })

      // add
      .addCase(addFamilyMember.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(addFamilyMember.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items.unshift(action.payload)
      })
      .addCase(addFamilyMember.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || action.error.message
      })

      // delete
      .addCase(deleteFamilyMember.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(deleteFamilyMember.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = state.items.filter((m) => m.id !== action.payload.id)
      })
      .addCase(deleteFamilyMember.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || action.error.message
      })
  },
})

export const { resetFamilyState } = familySlice.actions
export default familySlice.reducer
