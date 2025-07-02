// 全域共用按鈕元件

import React, { FC } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { ButtonProps } from './Button.types'
import { createStyles } from './Button.styles'

/**
 * 全域共用按鈕元件
 * 可在任何畫面或功能中使用
 * 支援亮暗主題自動切換
 */
export const Button: FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onPress,
  style,
  ...props 
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  // 計算載入指示器顏色
  const getLoadingColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.secondary
      case 'secondary':
        return theme.colors.primary
      case 'danger':
        return '#FFFFFF'
      case 'ghost':
        return theme.colors.text
      default:
        return theme.colors.secondary
    }
  }
  
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        loading && styles.loading,
        style,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={getLoadingColor()} 
          />
        </View>
      )}
      <Text 
        style={[
          styles.text, 
          styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
          styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles]
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}