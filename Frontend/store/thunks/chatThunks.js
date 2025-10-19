import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchChatMessagesApi, sendChatMessageApi, uploadReportToChatApi, fetchConversationsApi } from "../api/chatApi"

export const fetchChatMessages = createAsyncThunk("chat/fetchMessages", async (conversationId, { rejectWithValue }) => {
  try {
    const data = await fetchChatMessagesApi(conversationId)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ conversationId, message }, { rejectWithValue }) => {
    try {
      const data = await sendChatMessageApi(conversationId, message)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const uploadReportToChat = createAsyncThunk(
  "chat/uploadReport",
  async ({ conversationId, file, reportData }, { rejectWithValue }) => {
    try {
      const data = await uploadReportToChatApi(conversationId, file, reportData)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchConversations = createAsyncThunk("chat/fetchConversations", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchConversationsApi()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
