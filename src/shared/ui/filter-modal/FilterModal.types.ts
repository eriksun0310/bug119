import { PestType, TaskPriority } from '@/shared/types'

export interface FilterModalFilters {
  pestType: PestType | null
  priority: TaskPriority | null
  isImmediate: boolean
}

export interface FilterModalProps {
  visible: boolean
  filters: FilterModalFilters
  onApply: (filters: FilterModalFilters) => void
  onReset: () => void
  onClose: () => void
}