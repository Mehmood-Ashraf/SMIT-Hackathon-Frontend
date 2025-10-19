import { configureStore } from "@reduxjs/toolkit"
import chatReducer from "./slices/chatSlice"
import reportsReducer from "./slices/reportsSlice"
import userReducer from "./slices/userSlice"
import vitalsReducer from "./slices/vitalsSlice"
import uiReducer from "./slices/uiSlice"
import familyReducer from "./slices/familySlice"
import reportReducer from "./slices/reportSlice"

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    reports: reportsReducer,
    user: userReducer,
    vitals: vitalsReducer,
    ui: uiReducer,
    family: familyReducer,
    report:reportReducer,
  },
})

export default store
