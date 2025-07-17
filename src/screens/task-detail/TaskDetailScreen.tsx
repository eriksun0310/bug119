// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import React from 'react'
import { ScrollView, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth, useResponsive, useTaskDetailLogic, useTaskActions } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList } from '@/shared/types'
import { ScreenHeader, TaskCard, TaskStatusRenderer } from '@/shared/ui'
import { createStyles } from './TaskDetailScreen.styles'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()

  // 使用 Hook 獲取任務相關資料
  const { taskId } = route.params
  const { task, contactInfo } = useTaskDetailLogic(taskId, user)

  // 使用 Hook 獲取任務操作函數
  const { handleAcceptTask, handleSelectTerminator } = useTaskActions()

  const styles = createStyles(theme, isTablet)

  return (
    <View style={styles.container}>
      <ScreenHeader title="任務詳情" showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* 頂部任務摘要卡片 */}
        <View style={styles.taskCardContainer}>
          <TaskCard task={task} />
        </View>

        {/* 使用 TaskStatusRenderer 處理不同狀態的渲染 */}
        <View style={styles.contactSectionContainer}>
          <TaskStatusRenderer
            task={task}
            user={user}
            contactPerson={contactInfo?.person || null}
            contactTitle={contactInfo?.title || ''}
            onAcceptTask={handleAcceptTask}
            onSelectTerminator={handleSelectTerminator}
            isTablet={isTablet}
          />
        </View>
      </ScrollView>
    </View>
  )
}
