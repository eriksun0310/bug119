// 共用基礎型別定義

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T = any> {
  data: T | null
  loading: LoadingState
  error: string | null
}