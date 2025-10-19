import { createSlice } from "@reduxjs/toolkit"
import { fetchUserProfile, updateUserProfile, loginUser, logoutUser } from "../thunks/userThunks"

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Update profile
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
  },
})

export const { clearError } = userSlice.actions
export default userSlice.reducer
