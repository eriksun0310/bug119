// 害蟲類型選擇器型別定義

import { PestType } from '@/shared/types'

export interface PestSelectorProps {
  value?: PestType
  onChange: (pestType: PestType) => void
  error?: string
  label?: string
}