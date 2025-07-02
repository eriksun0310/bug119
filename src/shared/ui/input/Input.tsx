// 全域共用輸入框元件

import React, { FC, useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useTheme } from '@/shared/theme'
import { InputProps } from './Input.types'
import { createStyles } from './Input.styles'

/**
 * 全域共用輸入框元件
 * 支援標籤、錯誤提示、圖示等功能
 * 支援亮暗主題自動切換
 */
export const Input: FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  size = 'md',
  fullWidth = true,
  style,
  ...props
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [isFocused, setIsFocused] = useState(false)
  
  // 計算容器樣式
  const getContainerStyle = () => {
    const baseStyle: any[] = [styles.inputContainer, styles[variant], styles[size]]
    
    if (isFocused) {
      baseStyle.push(styles[`${variant}Focused` as keyof typeof styles])
    }
    
    if (error) {
      baseStyle.push(styles[`${variant}Error` as keyof typeof styles])
    }
    
    return baseStyle
  }
  
  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      {/* 標籤 */}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      
      {/* 輸入框容器 */}
      <View style={getContainerStyle() as any}>
        {/* 左側圖示 */}
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        {/* 輸入框 */}
        <TextInput
          style={[
            styles.input,
            size === 'sm' && styles.inputSm,
            size === 'lg' && styles.inputLg,
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* 右側圖示 */}
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {/* 錯誤或輔助文字 */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  )
}