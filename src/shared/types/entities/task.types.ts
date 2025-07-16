// 任務實體型別定義

import { PestType } from './user.types'

export enum TaskStatus {
  PENDING = 'pending', // 發布中
  PENDING_CONFIRMATION = 'pending_confirmation', // 待確認
  IN_PROGRESS = 'in_progress', // 進行中
  COMPLETED = 'completed', // 已完成
}

export enum TaskPriority {
  NORMAL = 'normal', // 一般
  URGENT = 'urgent', // 緊急
  VERY_URGENT = 'very_urgent', // 非常緊急
}

export interface TaskLocation {
  latitude: number
  longitude: number
  city: string
  district: string
}

export interface Task {
  id: string
  title: string
  description: string
  pestType: PestType
  location: TaskLocation
  status: TaskStatus
  priority: TaskPriority
  budget: {
    min: number
    max: number
  }
  scheduledTime?: Date // 預約時間
  isImmediate: boolean // 是否立即處理
  createdBy: string // 小怕星 ID
  assignedTo?: string // 終結者 ID
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface TaskAssignment {
  taskId: string
  terminatorId: string
  proposedPrice: number
  estimatedDuration: number // 預估時間（分鐘）
  message?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

export interface TaskProgress {
  taskId: string
  status: TaskStatus
  currentStep: string
  completionPercentage: number
  notes?: string
  updatedAt: Date
}
