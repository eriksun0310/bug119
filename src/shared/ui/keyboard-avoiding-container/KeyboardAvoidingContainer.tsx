import React, { FC } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { KeyboardAvoidingContainerProps } from './KeyboardAvoidingContainer.types'

/**
 * 鍵盤避讓容器 - 統一處理鍵盤彈出時的頁面佈局調整
 * 
 * 根據平台自動設定最佳的避讓行為：
 * - iOS: 使用 padding 模式
 * - Android: 使用 height 模式
 * 
 * @param props KeyboardAvoidingContainerProps
 */
export const KeyboardAvoidingContainer: FC<KeyboardAvoidingContainerProps> = ({
  children,
  style,
  customOffset,
  enableOffset = true,
  behavior,
  keyboardVerticalOffset,
  ...props
}) => {
  // 預設行為設定
  const defaultBehavior = behavior || (Platform.OS === 'ios' ? 'padding' : 'height')
  
  // 預設偏移量設定
  const defaultOffset = keyboardVerticalOffset !== undefined 
    ? keyboardVerticalOffset 
    : enableOffset 
      ? (customOffset || (Platform.OS === 'ios' ? 0 : 20))
      : 0

  return (
    <KeyboardAvoidingView
      style={style}
      behavior={defaultBehavior}
      keyboardVerticalOffset={defaultOffset}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}