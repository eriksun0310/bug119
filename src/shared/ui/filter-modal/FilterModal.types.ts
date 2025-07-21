import { PestType, TaskPriority } from '@/shared/types'
import { AddressValue } from '../address-selector/AddressSelector.types'

export interface FilterModalFilters {
  pestType: PestType | null
  priority: TaskPriority | null
  isImmediate: boolean
  location: AddressValue
}

export interface FilterModalProps {
  visible: boolean
  filters: FilterModalFilters
  onApply: (filters: FilterModalFilters) => void
  onReset: () => void
  onClose: () => void
}