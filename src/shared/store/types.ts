// Redux Store 型別定義

import { store } from './index'

// 推斷 RootState 型別
export type RootState = ReturnType<typeof store.getState>

// 推斷 AppDispatch 型別  
export type AppDispatch = typeof store.dispatch

// Auth State 型別
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Tasks State 型別
export interface TasksState {
  allTasks: Task[]
  myTasks: Task[]
  availableTasks: Task[]
  currentTask: Task | null
  loading: boolean
  error: string | null
  filters: {
    pestType?: string
    priority?: string
    location?: string
    searchQuery?: string
  }
}

// UI State 型別
export interface UIState {
  theme: 'light' | 'dark'
  notifications: Notification[]
}

// 匯入相關型別
import { User } from '@/shared/types'
import { Task } from '@/shared/types'

// Notification 型別定義
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}