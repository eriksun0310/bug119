// 認證狀態管理 Slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../types'
import { User } from '@/shared/types'

// 初始狀態
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 開始載入
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
      if (action.payload) {
        state.error = null
      }
    },

    // 設定錯誤
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },

    // 登入成功
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },

    // 登出
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },

    // 更新用戶資料
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    // 清除錯誤
    clearError: (state) => {
      state.error = null
    },
  },
})

// 導出 actions
export const {
  setLoading,
  setError,
  loginSuccess,
  logout,
  updateUser,
  clearError,
} = authSlice.actions

// 導出 reducer
export default authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error