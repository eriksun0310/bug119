// SegmentedControl 元件型別定義

import { ReactNode } from 'react'
import { TouchableOpacityProps } from 'react-native'

export interface SegmentOption<T = string> {
  value: T
  label: string
  icon?: ReactNode | React.ComponentType<any>
  disabled?: boolean
}

export interface SegmentedControlProps<T = string> extends Omit<TouchableOpacityProps, 'onPress'> {
  options: SegmentOption<T>[]
  value: T
  onValueChange: (value: T) => void
  disabled?: boolean
  fullWidth?: boolean
}