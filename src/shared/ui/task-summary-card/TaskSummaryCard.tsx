// 任務摘要卡片共用元件

import { getPestTypeDisplayName } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { Card } from '@/shared/ui'
import React, { FC } from 'react'
import { Text } from 'react-native'
import { TaskSummaryCardProps } from './TaskSummaryCard.types'
import { createStyles } from './TaskSummaryCard.styles'

/**
 * 任務摘要卡片元件
 * 用於顯示任務的基本資訊摘要
 * 統一 UI 樣式，在所有頁面中保持一致
 */
export const TaskSummaryCard: FC<TaskSummaryCardProps> = ({ task }) => {
  const { theme } = useTheme()

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const styles = createStyles(theme)

  return (
    <Card style={styles.card}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskMeta}>害蟲類型：{getPestTypeDisplayName(task.pestType)}</Text>
      <Text style={styles.taskMeta}>
        預算：${task.budget}
      </Text>
      <Text style={styles.taskMeta}>
        地點：{task.location.district}, {task.location.city}
      </Text>
      <Text style={styles.taskMeta}>發布時間：{formatDateTime(task.createdAt)}</Text>
    </Card>
  )
}
