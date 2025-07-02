// 輸入框元件型別定義

import { TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}