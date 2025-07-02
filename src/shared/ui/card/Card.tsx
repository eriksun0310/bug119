// 全域共用卡片元件

import React, { FC } from 'react'
import { View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { CardProps } from './Card.types'

/**
 * 全域共用卡片元件
 * 提供統一的卡片樣式和陰影效果
 * 支援亮暗主題自動切換
 */
export const Card: FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  children,
  style,
  ...props
}) => {
  const { theme } = useTheme()
  
  // 計算卡片樣式
  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.surface,
    }
    
    // 變體樣式
    const variantStyle = (() => {
      switch (variant) {
        case 'elevated':
          return theme.shadows.md
        case 'outlined':
          return {
            borderWidth: 1,
            borderColor: theme.colors.border,
          }
        case 'filled':
          return {
            backgroundColor: theme.colors.background,
          }
        default:
          return {}
      }
    })()
    
    // 內邊距樣式
    const paddingStyle = (() => {
      switch (padding) {
        case 'none':
          return {}
        case 'sm':
          return { padding: theme.spacing.sm }
        case 'md':
          return { padding: theme.spacing.md }
        case 'lg':
          return { padding: theme.spacing.lg }
        default:
          return { padding: theme.spacing.md }
      }
    })()
    
    return [baseStyle, variantStyle, paddingStyle]
  }
  
  return (
    <View style={[...getCardStyle(), style]} {...props}>
      {children}
    </View>
  )
}