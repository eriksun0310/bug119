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
  budget: number
  scheduledTime?: Date // 預約時間
  isImmediate: boolean // 是否立即處理
  createdBy: string // 小怕星 ID
  applicants: TaskApplication[] // 申請此任務的終結者列表
  
  // 只在 IN_PROGRESS 和 COMPLETED 狀態下存在
  assignedTo?: string // 終結者 ID
  completionStatus?: {
    fearStarConfirmed: boolean // 小怕星是否確認完成
    terminatorConfirmed: boolean // 終結者是否確認完成
  }
  
  // 只在 COMPLETED 狀態下存在
  completedAt?: Date
  
  createdAt: Date
  updatedAt: Date
}

export interface TaskApplication {
  id: string
  taskId: string
  terminatorId: string
  appliedAt: Date
  status: 'pending' | 'selected' | 'rejected'
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
