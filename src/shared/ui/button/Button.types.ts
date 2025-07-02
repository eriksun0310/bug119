// 按鈕元件型別定義

import { TouchableOpacityProps } from 'react-native'

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  onPress?: () => void
}