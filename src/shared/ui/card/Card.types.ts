// 卡片元件型別定義

import { ViewProps } from 'react-native'

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}