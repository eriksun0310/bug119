// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import React from 'react'
import { ScrollView, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuthRedux, useResponsive, useTaskDetailLogic, useTaskActions } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList } from '@/shared/types'
import { ScreenHeader, TaskCard, TaskStatusRenderer } from '@/shared/ui'
import { taskStatusValidator } from '@/shared/utils'
import { createStyles } from './TaskDetailScreen.styles'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { isTablet } = useResponsive()
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()

  // 使用 Hook 獲取任務相關資料
  const { taskId } = route.params
  const { task, contactInfo } = useTaskDetailLogic(taskId, user)

  // 使用 Hook 獲取任務操作函數
  const { 
    handleAcceptTask, 
    handleSelectTerminator, 
    handleMarkCompleted,
    handleDeleteTask,
    handleCancelTask,
    handleDeleteRecord,
    handleWithdrawApplication
  } = useTaskActions()

  const styles = createStyles(theme, isTablet)

  // 如果任務不存在（已被刪除），自動返回上一頁
  React.useEffect(() => {
    if (!task) {
      navigation.goBack()
    }
  }, [task, navigation])

  // 如果任務不存在，不渲染任何內容
  if (!task) {
    return null
  }

  // 取得任務狀態的中文顯示
  const statusText = taskStatusValidator.getStatusDisplayText(task.status)
  const headerTitle = `任務詳情 - ${statusText}`

  return (
    <View style={styles.container}>
      <ScreenHeader title={headerTitle} showBackButton onBackPress={() => navigation.goBack()} />

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
            onMarkCompleted={handleMarkCompleted}
            onDeleteTask={handleDeleteTask}
            onCancelTask={handleCancelTask}
            onDeleteRecord={handleDeleteRecord}
            onWithdrawApplication={handleWithdrawApplication}
            isTablet={isTablet}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  )
}
