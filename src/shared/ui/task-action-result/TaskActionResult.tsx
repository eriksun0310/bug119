import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Check } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { createStyles } from './TaskActionResult.styles'
import { TaskActionResultProps } from './TaskActionResult.types'

/**
 * 任務操作結果元件
 * 顯示操作成功後的簡潔 UI
 */
export const TaskActionResult: FC<TaskActionResultProps> = ({
  type,
  message,
  onViewTask,
  buttonText = '查看任務',
  showButton = true,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  // 根據類型選擇圖標顏色
  const getIconColor = () => {
    switch (type) {
      case 'withdraw':
      case 'delete':
      case 'cancel':
        return theme.colors.warning
      default:
        return theme.colors.success
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getIconColor() + '20' }]}>
        <Check size={24} color={getIconColor()} />
      </View>
      
      <Text style={styles.message}>{message}</Text>
      
      {showButton && onViewTask && (
        <TouchableOpacity
          style={styles.button}
          onPress={onViewTask}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}