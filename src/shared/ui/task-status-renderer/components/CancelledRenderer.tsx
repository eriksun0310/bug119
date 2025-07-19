import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 已取消狀態渲染器
 * 處理 CANCELLED 狀態的UI渲染
 */
export const CancelledRenderer: FC<StatusRendererProps> = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>任務狀態</Text>
      <Text style={styles.emptyApplicants}>此任務已被取消</Text>
    </View>
  )
}