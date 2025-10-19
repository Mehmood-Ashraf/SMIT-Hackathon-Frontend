import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebarOpen: true,
  theme: "light",
  language: "en",
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { toggleSidebar, setTheme, setLanguage, addNotification, removeNotification } = uiSlice.actions
export default uiSlice.reducer
