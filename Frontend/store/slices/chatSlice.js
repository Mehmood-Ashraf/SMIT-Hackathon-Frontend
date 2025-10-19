import { createSlice } from "@reduxjs/toolkit"
import { fetchChatMessages, sendChatMessage, uploadReportToChat } from "../thunks/chatThunks"

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  loading: false,
  error: null,
  uploadingReport: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch messages
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Send message
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false
        state.messages.push(action.payload)
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Upload report
    builder
      .addCase(uploadReportToChat.pending, (state) => {
        state.uploadingReport = true
        state.error = null
      })
      .addCase(uploadReportToChat.fulfilled, (state, action) => {
        state.uploadingReport = false
        state.messages.push(action.payload)
      })
      .addCase(uploadReportToChat.rejected, (state, action) => {
        state.uploadingReport = false
        state.error = action.payload
      })
  },
})

export const { setCurrentConversation, clearError } = chatSlice.actions
export default chatSlice.reducer
