// 優先程度選擇器型別定義

import { TaskPriority } from '../../types'

export interface PrioritySelectorProps {
  value?: TaskPriority
  onChange: (priority: TaskPriority) => void
  error?: string
  label?: string
}