import { ReactNode } from 'react'
import { ViewStyle, KeyboardAvoidingViewProps } from 'react-native'

export interface KeyboardAvoidingContainerProps extends Omit<KeyboardAvoidingViewProps, 'children' | 'style'> {
  children: ReactNode
  style?: ViewStyle
  customOffset?: number
  enableOffset?: boolean
}