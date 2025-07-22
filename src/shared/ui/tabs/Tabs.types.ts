import { ViewStyle } from 'react-native'

export interface TabOption {
  key: string
  title: string
  icon?: React.ReactNode
  disabled?: boolean
  count?: number
}

export interface TabsProps {
  options: TabOption[]
  value: string
  onChange: (value: string) => void
  style?: ViewStyle
  scrollable?: boolean // 支援水平滾動
  showCount?: boolean // 是否顯示計數
}