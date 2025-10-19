import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUserProfileApi, updateUserProfileApi, loginUserApi, logoutUserApi } from "../api/userApi"

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchUserProfileApi()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const data = await updateUserProfileApi(userData)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const loginUser = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await loginUserApi(email, password)
    localStorage.setItem("token", data.token)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutUserApi()
    localStorage.removeItem("token")
    return true
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
