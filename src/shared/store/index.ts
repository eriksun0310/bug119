// Redux Store 配置

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import tasksReducer from './slices/tasksSlice'

// 配置 Redux Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    // 未來將添加更多 reducers:
    // ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 序列化檢查配置
      serializableCheck: {
        // 忽略這些 action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // 忽略這些欄位
        ignoredPaths: ['register'],
      },
    }),
  // 只在開發環境啟用 Redux DevTools
  devTools: __DEV__,
})

// 匯出型別
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 預設匯出 store
export default store