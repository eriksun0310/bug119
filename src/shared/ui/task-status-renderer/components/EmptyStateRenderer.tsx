import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 空狀態渲染器
 * 處理未知狀態或默認情況的UI渲染
 */
export const EmptyStateRenderer: FC<StatusRendererProps> = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
    </View>
  )
}