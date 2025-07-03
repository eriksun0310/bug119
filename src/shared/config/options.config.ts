// 統一的選項配置檔案
// 所有選擇器元件的選項配置都集中在這裡管理

import * as React from 'react'
import { 
  Bug, 
  Clock, 
  AlertTriangle, 
  Zap, 
  Phone, 
  MessageCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react-native'
import { 
  Gender, 
  PestType, 
  TaskPriority, 
  ContactMethod 
} from '../types'
import type { SegmentOption } from '../ui'

// ================================
// 性別選項配置
// ================================
export const GENDER_OPTIONS: SegmentOption<Gender>[] = [
  { value: Gender.MALE, label: '男' },
  { value: Gender.FEMALE, label: '女' },
  { value: Gender.ANY, label: '不限' }
] as const

// ================================
// 聯絡方式選項配置
// ================================
export const CONTACT_METHOD_OPTIONS: SegmentOption<ContactMethod>[] = [
  {
    value: ContactMethod.PHONE,
    label: '電話',
    icon: Phone
  },
  {
    value: ContactMethod.LINE,
    label: 'LINE',
    icon: MessageCircle
  }
] as const

// ================================
// 害蟲類型選項配置
// ================================
export interface PestTypeOption {
  type: PestType
  name: string
  icon: React.ComponentType<any>
  description: string
}

export const PEST_TYPE_OPTIONS: PestTypeOption[] = [
  {
    type: PestType.COCKROACH,
    name: '蟑螂',
    icon: Bug,
    description: '常見於廚房、浴室等潮濕環境'
  },
  {
    type: PestType.ANT,
    name: '螞蟻',
    icon: Bug,
    description: '成群出現，喜歡甜食和食物殘渣'
  },
  {
    type: PestType.MOSQUITO,
    name: '蚊子',
    icon: Bug,
    description: '吸血昆蟲，傳播疾病風險'
  },
  {
    type: PestType.SPIDER,
    name: '蜘蛛',
    icon: Bug,
    description: '結網捕食，角落常見'
  },
  {
    type: PestType.OTHER,
    name: '其他',
    icon: Bug,
    description: '其他類型害蟲或不確定種類'
  }
] as const

// ================================
// 預算範圍選項配置
// ================================
export interface BudgetOption {
  min: number
  max: number
  label: string
}

export const BUDGET_PRESET_OPTIONS: BudgetOption[] = [
  { min: 500, max: 1000, label: '$500 - $1,000' },
  { min: 1000, max: 2000, label: '$1,000 - $2,000' },
  { min: 2000, max: 3000, label: '$2,000 - $3,000' },
  { min: 3000, max: 5000, label: '$3,000 - $5,000' }
] as const

// ================================
// 任務優先程度選項配置
// ================================
export interface PriorityOption {
  type: TaskPriority
  name: string
  icon: React.ComponentType<any>
  description: string
  color: string
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    type: TaskPriority.NORMAL,
    name: '一般',
    icon: Clock,
    description: '可安排時間處理',
    color: '#666666'
  },
  {
    type: TaskPriority.URGENT,
    name: '緊急',
    icon: AlertTriangle,
    description: '需要盡快處理',
    color: '#FF9500'
  },
  {
    type: TaskPriority.VERY_URGENT,
    name: '非常緊急',
    icon: Zap,
    description: '立即需要處理',
    color: '#FF3B30'
  }
] as const

// ================================
// 任務牆篩選選項配置
// ================================

export interface FilterOption {
  key: string
  label: string
}

// 任務牆害蟲類型篩選選項（簡化版）
export const TASK_WALL_PEST_FILTER_OPTIONS: FilterOption[] = [
  { key: 'cockroach', label: '蟑螂' },
  { key: 'ant', label: '螞蟻' },
  { key: 'termite', label: '白蟻' },
  { key: 'mosquito', label: '蚊子' },
  { key: 'fly', label: '蒼蠅' },
  { key: 'other', label: '其他' }
] as const

// 任務牆優先程度篩選選項（簡化版）
export const TASK_WALL_PRIORITY_FILTER_OPTIONS: FilterOption[] = [
  { key: 'urgent', label: '緊急' },
  { key: 'high', label: '高' },
  { key: 'normal', label: '一般' },
  { key: 'low', label: '低' }
] as const

// ================================
// 任務標籤頁選項配置
// ================================

export interface TaskTabOption {
  key: string
  title: string
  icon: React.ComponentType<any>
}

export const TASK_TAB_OPTIONS: TaskTabOption[] = [
  {
    key: 'ongoing',
    title: '進行中12',
    icon: Clock
  },
  {
    key: 'pending',
    title: '待確認',
    icon: AlertCircle
  },
  {
    key: 'completed',
    title: '已完成',
    icon: CheckCircle
  }
] as const

// ================================
// 選項配置的輔助函數
// ================================

// 根據值獲取性別選項
export const getGenderOption = (value: Gender) => {
  for (const option of GENDER_OPTIONS) {
    if (option.value === value) return option
  }
  return undefined
}

// 根據值獲取聯絡方式選項
export const getContactMethodOption = (value: ContactMethod) => {
  for (const option of CONTACT_METHOD_OPTIONS) {
    if (option.value === value) return option
  }
  return undefined
}

// 根據類型獲取害蟲選項
export const getPestTypeOption = (type: PestType) => {
  for (const option of PEST_TYPE_OPTIONS) {
    if (option.type === type) return option
  }
  return undefined
}

// 根據類型獲取優先程度選項
export const getPriorityOption = (type: TaskPriority) => {
  for (const option of PRIORITY_OPTIONS) {
    if (option.type === type) return option
  }
  return undefined
}

// 根據範圍獲取預算選項
export const getBudgetOption = (min: number, max: number) => {
  for (const option of BUDGET_PRESET_OPTIONS) {
    if (option.min === min && option.max === max) return option
  }
  return undefined
}

// 根據鍵值獲取任務牆篩選選項
export const getTaskWallPestFilterOption = (key: string) => {
  for (const option of TASK_WALL_PEST_FILTER_OPTIONS) {
    if (option.key === key) return option
  }
  return undefined
}

export const getTaskWallPriorityFilterOption = (key: string) => {
  for (const option of TASK_WALL_PRIORITY_FILTER_OPTIONS) {
    if (option.key === key) return option
  }
  return undefined
}

// 根據鍵值獲取任務標籤頁選項
export const getTaskTabOption = (key: string) => {
  for (const option of TASK_TAB_OPTIONS) {
    if (option.key === key) return option
  }
  return undefined
}

// 聯絡方式顯示名稱映射
export const getContactMethodDisplayName = (method: ContactMethod): string => {
  const option = getContactMethodOption(method)
  return option?.label || method
}