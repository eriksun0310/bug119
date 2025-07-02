// 可滑動的行組件，使用 react-native-gesture-handler 實現左滑刪除功能

import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { SharedValue } from 'react-native-reanimated'
import { Trash2 } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'

const DELETE_BUTTON_WIDTH = 100 // 刪除按鈕寬度

interface SwipeableRowProps {
  children: React.ReactNode
  onDelete: () => void // 實際刪除操作
  onDeletePress: () => void // 點擊刪除按鈕時的回調
  deleteText?: string
  onSwipeOpen?: () => void // 當此項目滑動打開時的回調
  onSwipeClose?: () => void // 當此項目滑動關閉時的回調
}

export interface SwipeableRowRef {
  executeDelete: () => void
  close: () => void
}

export const SwipeableRow = forwardRef<SwipeableRowRef, SwipeableRowProps>(({ 
  children,
  onDelete,
  onDeletePress,
  deleteText = '刪除',
  onSwipeOpen,
  onSwipeClose
}, ref) => {
  const { theme } = useTheme()
  const swipeableRef = useRef<ReanimatedSwipeable>(null)
  
  // 渲染右側刪除按鈕
  const renderRightAction = (progress: SharedValue<number>, translation: SharedValue<number>) => {
    return (
      <View style={styles.deleteAction}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDeletePress}
        >
          <Trash2 size={24} color="white" />
          <Text style={styles.deleteText}>{deleteText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  // 處理滑動打開
  const handleSwipeOpen = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      onSwipeOpen?.()
    }
  }
  
  // 處理滑動關閉
  const handleSwipeClose = () => {
    onSwipeClose?.()
  }
  
  // 關閉滑動
  const closeSwipeable = () => {
    swipeableRef.current?.close()
  }
  
  // 執行刪除動畫
  const executeDeleteAnimation = () => {
    onDelete()
  }
  
  // 暴露方法給父組件
  useImperativeHandle(ref, () => ({
    executeDelete: executeDeleteAnimation,
    close: closeSwipeable
  }))
  
  const styles = StyleSheet.create({
    deleteAction: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: DELETE_BUTTON_WIDTH,
      backgroundColor: '#FF4444', // 紅色背景
    },
    deleteButton: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingVertical: theme.spacing.md,
    },
    deleteText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: theme.fontSize.md,
      marginTop: theme.spacing.xs,
    },
  })
  
  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={renderRightAction}
      onSwipeableOpen={handleSwipeOpen}
      onSwipeableClose={handleSwipeClose}
      rightThreshold={40}
      friction={2}
    >
      {children}
    </ReanimatedSwipeable>
  )
})