// src/store/familyThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit"
import { familyAPI } from "../api/familyApi"

export const fetchFamilyMembers = createAsyncThunk(
  "family/fetchMembers",
  async (_, thunkAPI) => {
    try {
        console.log('upper')
      const res = await familyAPI.getFamilyMembers()
      console.log('lower')
      if (!res.ok) return thunkAPI.rejectWithValue("Failed to load members")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to load members")
    }
  }
)

export const addFamilyMember = createAsyncThunk(
  "family/addMember",
  async (payload, thunkAPI) => {
    try {
        console.log(payload)
      const res = await familyAPI.addFamilyMember(payload)
      console.log("lower")
      if (!res.ok) return thunkAPI.rejectWithValue("Failed to add member")
      return res.data
    } catch (err) {
        console.log(err)
      return thunkAPI.rejectWithValue(err.message || "Failed to add member")
    }
  }
)

export const deleteFamilyMember = createAsyncThunk(
  "family/deleteMember",
  async (id, thunkAPI) => {
    try {
      const res = await familyAPI.deleteFamilyMember(id)
      if (!res.ok) return thunkAPI.rejectWithValue("Failed to delete member")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to delete member")
    }
  }
)