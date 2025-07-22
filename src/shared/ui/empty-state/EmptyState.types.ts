import { ViewStyle } from 'react-native'
import { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  action?: {
    label: string
    onPress: () => void
  }
  style?: ViewStyle
}